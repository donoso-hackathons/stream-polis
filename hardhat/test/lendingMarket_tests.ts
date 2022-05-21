import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { initEnv, waitForTx } from '../helpers/utils';
import * as hre from 'hardhat';
import { BaseProvider, TransactionReceipt } from '@ethersproject/providers';
import {
  ERC20__factory,
  Events__factory,
  ISuperfluidToken__factory,
  LendingMarketPlace,
  LendingMarketPlace__factory,
  LoanFactory,
  LoanFactory__factory,
} from '../typechain-types';
import { LoanOfferStruct, OfferConfigStruct } from '../typechain-types/Events';
import { utils } from 'ethers';
import { getTimestamp, matchEvent } from './helpers/utils';
import { Framework } from '@superfluid-finance/sdk-core';
import { Superfluid__factory } from '@superfluid-finance/sdk-core/dist/module/typechain';
import { parseEther } from 'ethers/lib/utils';
import { TradeConfigStruct } from '../typechain-types/LendingMarketPlace';
import { of } from 'rxjs';

let lendMarketPlaceContract: LendingMarketPlace;
let loanFactory: LoanFactory;

let HOST = '0xEB796bdb90fFA0f28255275e16936D25d3418603';
let CFA = '0x49e565Ed1bdc17F3d220f72DF0857C26FA83F873';

let TOKEN1 = '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f';
let TOKEN2 = '0x42bb40bF79730451B11f6De1CbA222F17b87Afd7';

let deployer: SignerWithAddress;
let user1: SignerWithAddress;
let user2: SignerWithAddress;
let user3: SignerWithAddress;
let provider: BaseProvider;
let eventsLib: any;
let sf: Framework;

describe('Lending market Place', function () {
  beforeEach(async () => {
    [deployer, user1, user2, user3] = await initEnv(hre);
    provider = hre.ethers.provider;

    loanFactory = await new LoanFactory__factory(deployer).deploy();

    lendMarketPlaceContract = await new LendingMarketPlace__factory(
      deployer
    ).deploy(loanFactory.address, HOST, 2);

    eventsLib = await new Events__factory(deployer).deploy();

    /// Launch SF FRAMEOWRK
    //// SUPERFLUID SDK INITIALIZATION
    sf = await Framework.create({
      networkName: 'local',
      provider: provider,
      customSubgraphQueriesEndpoint:
        'https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai',
      resolverAddress: '0x8C54C83FbDe3C59e59dd6E324531FB93d4F504d3',
    });
  });

  it('Should Start with No offers created', async function () {
    expect(await lendMarketPlaceContract._loansOfferedCounter()).to.equal(0);
  });

  it('Should create an offer and emit event', async function () {
    let amountLoan = +utils.parseEther('10').toString();

    let collateralShare = (amountLoan / 10).toFixed(0);
    let durationDays = 365;
    let inflowRate = (amountLoan / (durationDays * 24 * 60 * 60)).toFixed(0);

    const lendMarketPlaceContractUser1 =
      await LendingMarketPlace__factory.connect(
        lendMarketPlaceContract.address,
        user1
      );

    let offerConfig: OfferConfigStruct = {
      loanMaxAmount: parseEther('20'),
      loanMinAmount: parseEther('5'),
      fee: 30,
      superToken: TOKEN1,
      collateralShare: 100,
      maxDuration: 30 * 24 * 60 * 60,
    };

    const receipt = await waitForTx(
      lendMarketPlaceContractUser1.offerLoan(offerConfig)
    );
    expect(await lendMarketPlaceContract._loansOfferedCounter()).to.equal(1);

    matchEvent(receipt, 'LoanOfferCreated', eventsLib, [
      [
        1,
        [parseEther('20'), parseEther('5'), 30, TOKEN1, 100, 30 * 24 * 60 * 60],
        user1.address,
        0,
      ],
    ]);
  });

  it('Should Create a loan trade and emit the correc event ', async function () {
    let amountLoan = +utils.parseEther('10').toString();
    let collateralShare = (amountLoan / 10).toFixed(0);
    let durationDays = 365;
    let inflowRate = (amountLoan / (durationDays * 24 * 60 * 60)).toFixed(0);

    let offerConfig: OfferConfigStruct = {
      loanMaxAmount: parseEther('20'),
      loanMinAmount: parseEther('5'),
      fee: 30,
      superToken: TOKEN1,
      collateralShare: 100,
      maxDuration: 30 * 24 * 60 * 60,
    };

    const lendMarketPlaceContractUser1 =
      await LendingMarketPlace__factory.connect(
        lendMarketPlaceContract.address,
        user1
      );

    await waitForTx(lendMarketPlaceContractUser1.offerLoan(offerConfig));

    const superotkenContract = await ERC20__factory.connect(TOKEN1, deployer);
    await superotkenContract.approve(
      lendMarketPlaceContract.address,
      collateralShare
    );

    let tradeConfig: TradeConfigStruct = {
      offerId: 1,
      loanAmount: parseEther('5'),
      duration: 60 * 60,
    };

    const getMaths = await lendMarketPlaceContract.getMaths(
      tradeConfig.loanAmount,
      offerConfig.fee,
      tradeConfig.duration,
      offerConfig.collateralShare
    );
    console.log(getMaths.totalInflowRate.toString());
    inflowRate = getMaths.totalInflowRate.toString();
    let oper = sf.cfaV1.updateFlowOperatorPermissions({
      superToken: TOKEN1,
      flowOperator: lendMarketPlaceContract.address,
      permissions: 1,
      flowRateAllowance: inflowRate,
    });

    let tx2 = await oper.exec(deployer);
    let receipt2 = await tx2.wait();

    let rexeot = await waitForTx(
      lendMarketPlaceContract.acceptOffer(tradeConfig)
    );

    let trade1 = await (
      await lendMarketPlaceContract._loansTradedById(1)
    ).loanContract;

    console.log(trade1);

    const userData = utils.defaultAbiCoder.encode(
      ['uint', 'address'],
      [1, deployer.address]
    );

    expect(await lendMarketPlaceContract._loansTradedCounter()).to.equal(1);

    const loanStream = await sf.cfaV1.getFlow({
      superToken: TOKEN1,
      sender: trade1,
      receiver: user1.address,
      providerOrSigner: user1,
    });



    expect(loanStream.flowRate).to.equal(inflowRate.toString());

    let balance = await ISuperfluidToken__factory.connect(
      TOKEN1,
      deployer
    ).realtimeBalanceOfNow(trade1);
    console.log(balance.availableBalance.toString());
    matchEvent(rexeot, 'LoanTradeCreated', eventsLib, [
      [
        1,
        offerConfig.fee,
        tradeConfig.loanAmount,
        getMaths.totalLoanAmount.toString(),
        getMaths.collateral.toString(),
        offerConfig.collateralShare,
        getMaths.totalInflowRate.toString(),
        await getTimestamp(),
        0,
        deployer.address,
        user1.address,
        TOKEN1,
        trade1,
      ],
    ]);
  });



  it.only('Should Terminate Flow', async function () {
    let amountLoan = +utils.parseEther('10').toString();
    let collateralShare = (amountLoan / 10).toFixed(0);
    let durationDays = 365;
    let inflowRate = (amountLoan / (durationDays * 24 * 60 * 60)).toFixed(0);

    let offerConfig: OfferConfigStruct = {
      loanMaxAmount: parseEther('20'),
      loanMinAmount: parseEther('5'),
      fee: 30,
      superToken: TOKEN1,
      collateralShare: 100,
      maxDuration: 30 * 24 * 60 * 60,
    };

    const lendMarketPlaceContractUser1 =
      await LendingMarketPlace__factory.connect(
        lendMarketPlaceContract.address,
        user1
      );

    await waitForTx(lendMarketPlaceContractUser1.offerLoan(offerConfig));

    const superotkenContract = await ERC20__factory.connect(TOKEN1, deployer);
    await superotkenContract.approve(
      lendMarketPlaceContract.address,
      collateralShare
    );

    let tradeConfig: TradeConfigStruct = {
      offerId: 1,
      loanAmount: parseEther('5'),
      duration: 60 * 60,
    };

    const getMaths = await lendMarketPlaceContract.getMaths(
      tradeConfig.loanAmount,
      offerConfig.fee,
      tradeConfig.duration,
      offerConfig.collateralShare
    );
 
    inflowRate = getMaths.totalInflowRate.toString();
    let oper = sf.cfaV1.updateFlowOperatorPermissions({
      superToken: TOKEN1,
      flowOperator: lendMarketPlaceContract.address,
      permissions: 1,
      flowRateAllowance: inflowRate,
    });

    let tx2 = await oper.exec(deployer);
    let receipt2 = await tx2.wait();

    let rexeot = await waitForTx(
      lendMarketPlaceContract.acceptOffer(tradeConfig)
    );

    let trade1 = await (
      await lendMarketPlaceContract._loansTradedById(1)
    ).loanContract;

    let p = await sf.loadSuperToken(TOKEN1)

    let balan =  await p.balanceOf({account:user1.address,providerOrSigner:deployer}) 
    console.log(balan.toString())
      
    const userData = utils.defaultAbiCoder.encode(
      ['uint', 'address'],
      [1, deployer.address]
    );
    const terminateFlowOperation = sf.cfaV1.deleteFlow({
      sender: deployer.address,
      superToken: TOKEN1,
      receiver: trade1,
      userData
    });
    let   tx  = await terminateFlowOperation.exec(deployer);
     await tx.wait()

  
   
   balan =  await p.balanceOf({account:user1.address,providerOrSigner:deployer}) 
    console.log(balan.toString())

  });


  // it('Should Terminate ', async function () {
  //   //let offer:LOANOFFERSTRUCT
  //   // let offer:LoanOfferStruct = {
  //   //     superToken:TOKEN1,
  //   //     loanProvider:deployer,

  //   // }
  //   let amountLoan = +utils.parseEther('10').toString();
  //   let collateralShare = (amountLoan / 10).toFixed(0);
  //   let durationDays = 365;
  //   let inflowRate = (amountLoan / (durationDays * 24 * 60 * 60)).toFixed(0);
  //   const lendMarketPlaceContractUser1 =
  //     await LendingMarketPlace__factory.connect(
  //       lendMarketPlaceContract.address,
  //       user1
  //     );
  //   await waitForTx(
  //     lendMarketPlaceContractUser1.offerLoan(
  //       amountLoan.toString(),
  //       TOKEN1,
  //       collateralShare,
  //       inflowRate
  //     )
  //   );

  //   const userData = utils.defaultAbiCoder.encode(
  //     ['uint', 'uint'],
  //     [1, 123456]
  //   );

  //   const superotkenContract = await ERC20__factory.connect(TOKEN1, deployer);
  //   await superotkenContract.approve(
  //     lendMarketPlaceContract.address,
  //     collateralShare
  //   );

  //   const createFlowOperation = sf.cfaV1.createFlow({
  //     flowRate: inflowRate,
  //     superToken: TOKEN1,
  //     receiver: lendMarketPlaceContract.address,
  //     userData,
  //   });

  //   let tx  = await createFlowOperation.exec(deployer);
  //   let receipt = await tx.wait()

  //   const terminateFlowOperation = sf.cfaV1.deleteFlow({
  //     sender: deployer.address,
  //     superToken: TOKEN1,
  //     receiver: lendMarketPlaceContract.address
  //   });

  //    tx  = await terminateFlowOperation.exec(deployer);
  //   receipt = await tx.wait()

  // });

  // it.only('Should TEST Terminate ', async function () {
  //   //let offer:LOANOFFERSTRUCT
  //   // let offer:LoanOfferStruct = {
  //   //     superToken:TOKEN1,
  //   //     loanProvider:deployer,

  //   // }
  //   let amountLoan = +utils.parseEther('10').toString();
  //   let collateralShare = (amountLoan / 10).toFixed(0);
  //   let durationDays = 365;
  //   let inflowRate = (amountLoan / (durationDays * 24 * 60 * 60)).toFixed(0);
  //   const lendMarketPlaceContractUser1 =
  //     await LendingMarketPlace__factory.connect(
  //       lendMarketPlaceContract.address,
  //       user1
  //     );
  //   await waitForTx(
  //     lendMarketPlaceContractUser1.offerLoan(
  //       amountLoan.toString(),
  //       TOKEN1,
  //       collateralShare,
  //       inflowRate
  //     )
  //   );

  //   const userData = utils.defaultAbiCoder.encode(
  //     ['uint', 'uint'],
  //     [1, 123456]
  //   );

  //   const superotkenContract = await ERC20__factory.connect(TOKEN1, deployer);
  //   await superotkenContract.approve(
  //     lendMarketPlaceContract.address,
  //     collateralShare
  //   );

  //   let oper=  sf.cfaV1.updateFlowOperatorPermissions({superToken:TOKEN1, flowOperator: user2.address,permissions:1,flowRateAllowance:inflowRate })

  //   let tx2  = await oper.exec(deployer);
  //   let receipt2 = await tx2.wait()

  //   const createFlowOperation = sf.cfaV1.createFlowByOperator({
  //     flowRate: inflowRate,
  //     sender:deployer.address,
  //     superToken: TOKEN1,
  //     receiver: lendMarketPlaceContract.address,
  //     userData,
  //   });

  //   let tx  = await createFlowOperation.exec(user2);
  //   let receipt = await tx.wait()
  //   expect(await lendMarketPlaceContract._loansTradedCounter()).to.equal(1);

  //   const loanStream = await sf.cfaV1.getFlow({
  //     superToken: TOKEN1,
  //     sender: lendMarketPlaceContract.address,
  //     receiver: user1.address,
  //     providerOrSigner: user1,
  //   });

  //   expect(loanStream.flowRate).to.equal(inflowRate.toString());

  //   const trade = await lendMarketPlaceContract._loansTradedById(1)

  //   expect(trade.loanTaker).to.equal(deployer.address);

  // });
});
