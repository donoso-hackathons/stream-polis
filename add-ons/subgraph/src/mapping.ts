import {
  LoanDemand,
  LoanOffer,
  LoanTraded,
  TotalSummary,
  User,
} from '../generated/schema';
import {
  LoanDemandCreated,
  LoanOfferCreated,
  LoanTradeCreated,
} from '../generated/LendingMarketPlace/LendingMarketPlace';

import { BigDecimal, BigInt } from '@graphprotocol/graph-ts';

export function handleLoanOfferCreated(event: LoanOfferCreated): void {
  let id = event.params.loanOffered.loanOfferId.toString();

  let userId = event.params.loanOffered.loanProvider.toHexString();
  createUser(userId);

  let loanOffer = new LoanOffer(id);
  loanOffer.loanMaxAmount = event.params.loanOffered.config.loanMaxAmount;
  loanOffer.loanMinAmount = event.params.loanOffered.config.loanMinAmount;
  loanOffer.fee = BigInt.fromI32(event.params.loanOffered.config.fee);
  loanOffer.superToken =
    event.params.loanOffered.config.superToken.toHexString();
  loanOffer.collateralShare = BigInt.fromI32(
    event.params.loanOffered.config.collateralShare
  );
  loanOffer.maxDuration = event.params.loanOffered.config.maxDuration;
  loanOffer.loanProvider = userId;
  loanOffer.status = BigInt.fromI32(event.params.loanOffered.status);

  loanOffer.save();
}

export function handleLoanDemandCreated(event: LoanDemandCreated): void {
  let id = event.params.loanDemand.loanDemandId.toString();
  let userId = event.params.loanDemand.loanTaker.toHexString();
  createUser(userId);

  let loanDemand = new LoanDemand(id);
  loanDemand.loanAmount = event.params.loanDemand.config.loanAmount;
  loanDemand.fee = BigInt.fromI32(event.params.loanDemand.config.fee);
  loanDemand.superToken =
    event.params.loanDemand.config.superToken.toHexString();
  loanDemand.collateralShare = BigInt.fromI32(
    event.params.loanDemand.config.collateralShare
  );
  // loanDemand.duration= event.params.loanDemand.config.d;
  loanDemand.loanTaker = userId;
  loanDemand.status = BigInt.fromI32(event.params.loanDemand.status);

  loanDemand.save();
}

export function handleLoanTradeCreated(event: LoanTradeCreated): void {
  let id = event.params.loanTraded.loanTradedId.toString();

  let takerId = event.params.loanTraded.loanTaker.toHexString();
  createUser(takerId);

  let loanTraded = new LoanTraded(id);
  loanTraded.loanTotalAmount = event.params.loanTraded.loanTotalAmount;
  loanTraded.collateral = event.params.loanTraded.collateral;
  loanTraded.initTimestamp = event.params.loanTraded.initTimestamp;
  loanTraded.flowRate = event.params.loanTraded.flowRate;
  loanTraded.status = BigInt.fromI32(event.params.loanTraded.status);
  loanTraded.collateralShare = BigInt.fromI32(
    event.params.loanTraded.collateralShare
  );
  loanTraded.loanTaker = event.params.loanTraded.loanTaker.toHexString();
  loanTraded.loanProvider = event.params.loanTraded.loanProvider.toHexString();
  loanTraded.loanAmount = event.params.loanTraded.loanAmount;
  loanTraded.superToken = event.params.loanTraded.superToken.toHexString();
  loanTraded.duration = event.params.loanTraded.duration;

  loanTraded.fee = BigInt.fromI32(event.params.loanTraded.fee);
  loanTraded.save();

  let summaryId = '1';

  let totalSummary = TotalSummary.load(summaryId);
  if (totalSummary == null) {
    totalSummary = new TotalSummary(summaryId);
  }
  totalSummary.totalBorrowed = totalSummary.totalBorrowed.plus(
    loanTraded.loanAmount
  );
  totalSummary.totalIncoming = totalSummary.totalIncoming.plus(
    loanTraded.flowRate
  );
  totalSummary.save()
}

function createUser(userId: string): User {
  let user = User.load(userId);
  if (user === null) {
    user = new User(userId);
    user.save();
  }
  return user;
}
