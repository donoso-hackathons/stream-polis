/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { StreamSwap, StreamSwapInterface } from "../StreamSwap";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token1",
        type: "address",
      },
      {
        internalType: "address",
        name: "_token2",
        type: "address",
      },
      {
        internalType: "contract ISuperfluid",
        name: "host",
        type: "address",
      },
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "cfa",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DECIMALS_RATIO",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_acceptedToken",
    outputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_cfa",
    outputs: [
      {
        internalType: "contract IConstantFlowAgreementV1",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_host",
    outputs: [
      {
        internalType: "contract ISuperfluid",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountToken1",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountToken2",
        type: "uint256",
      },
    ],
    name: "addInitialLiquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount1",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "afterAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementCreated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementTerminated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ISuperToken",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "beforeAgreementUpdated",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_flow",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "checkLiquidityToken1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLPTokens",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserveToken1",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getReserveToken2",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ratio",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "shares_per_user",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200175538038062001755833981016040819052620000349162000378565b60408051808201825260038082526253535760e81b60208084019182528451808601909552600e85526d053747265616d2053776170204c560941b90850152825192939262000085929190620002d2565b5080516200009b906004906020840190620002d2565b5050506001600160a01b0384166200010a5760405162461bcd60e51b815260206004820152602760248201527f546f6b656e312061646472657373207061737365642069732061206e756c6c206044820152666164647265737360c81b60648201526084015b60405180910390fd5b6001600160a01b038316620001725760405162461bcd60e51b815260206004820152602760248201527f546f6b656e322061646472657373207061737365642069732061206e756c6c206044820152666164647265737360c81b606482015260840162000101565b6001600160a01b038216620001ca5760405162461bcd60e51b815260206004820152601460248201527f686f7374206973207a65726f2061646472657373000000000000000000000000604482015260640162000101565b6001600160a01b038116620002225760405162461bcd60e51b815260206004820152601360248201527f636661206973207a65726f206164647265737300000000000000000000000000604482015260640162000101565b600580546001600160a01b038681166001600160a01b0319928316179092556006805486841690831617905560088054858416908316811790915560098054938516939092169290921790556040516315a722b960e31b815264150000000160048201819052919063ad3915c890602401600060405180830381600087803b158015620002ae57600080fd5b505af1158015620002c3573d6000803e3d6000fd5b50505050505050505062000435565b828054620002e090620003df565b90600052602060002090601f0160209004810192826200030457600085556200034f565b82601f106200031f57805160ff19168380011785556200034f565b828001600101855582156200034f579182015b828111156200034f57825182559160200191906001019062000332565b506200035d92915062000361565b5090565b5b808211156200035d576000815560010162000362565b600080600080608085870312156200038e578384fd5b84516200039b816200041c565b6020860151909450620003ae816200041c565b6040860151909350620003c1816200041c565b6060860151909250620003d4816200041c565b939692955090935050565b600181811c90821680620003f457607f821691505b602082108114156200041657634e487b7160e01b600052602260045260246000fd5b50919050565b6001600160a01b03811681146200043257600080fd5b50565b61131080620004456000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c806371ca337d11610104578063a457c2d7116100a2578063d92fc57d11610071578063d92fc57d146103d6578063dd62ed3e146103e0578063e09bafcf14610419578063e85313281461042157600080fd5b8063a457c2d71461038a578063a9059cbb1461039d578063c95f9d0e146103b0578063d86ed3e5146103c357600080fd5b8063852e5a0a116100de578063852e5a0a14610347578063884d1f401461035a57806395d89b411461036d578063a40f4fa11461037557600080fd5b806371ca337d1461030b5780637cb4d6d7146103145780638412de0a1461032757600080fd5b8063313ce5671161017157806353c11f991161014b57806353c11f99146102b45780635f9e7d77146102c75780636d850399146102da57806370a08231146102e257600080fd5b8063313ce5671461026757806339509351146102765780634e5b3c7c1461028957600080fd5b806318160ddd116101ad57806318160ddd14610226578063230dbd291461022e57806323b872dd1461024157806330d9c9151461025457600080fd5b806306fdde03146101d4578063095ea7b3146101f25780631224abfb14610215575b600080fd5b6101dc610434565b6040516101e99190611207565b60405180910390f35b610205610200366004610fd1565b6104c6565b60405190151581526020016101e9565b60025b6040519081526020016101e9565b600254610218565b6101dc61023c366004611098565b6104de565b61020561024f366004610f91565b610554565b6101dc610262366004610ffc565b610578565b604051601281526020016101e9565b610205610284366004610fd1565b6105e9565b600a5461029c906001600160a01b031681565b6040516001600160a01b0390911681526020016101e9565b6101dc6102c2366004611098565b610628565b6101dc6102d5366004610ffc565b610699565b61021861070a565b6102186102f0366004610f3d565b6001600160a01b031660009081526020819052604090205490565b61021860075481565b60095461029c906001600160a01b031681565b610218610335366004610f3d565b600b6020526000908152604090205481565b60085461029c906001600160a01b031681565b6101dc610368366004610ffc565b61078c565b6101dc6107fd565b61038861038336600461119b565b61080c565b005b610205610398366004610fd1565b610844565b6102056103ab366004610fd1565b6108ee565b6102186103be366004611177565b6108fc565b6101dc6103d1366004611098565b61096b565b610218620f424081565b6102186103ee366004610f59565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6102186109dc565b61021861042f366004611177565b610a0d565b60606003805461044390611271565b80601f016020809104026020016040519081016040528092919081815260200182805461046f90611271565b80156104bc5780601f10610491576101008083540402835291602001916104bc565b820191906000526020600020905b81548152906001019060200180831161049f57829003601f168201915b5050505050905090565b6000336104d4818585610ad6565b5060019392505050565b60405162461bcd60e51b815260206004820152602e60248201527f556e737570706f727465642063616c6c6261636b202d2041667465722041677260448201527f65656d656e74205570646174656400000000000000000000000000000000000060648201526060906084015b60405180910390fd5b600033610562858285610c2e565b61056d858585610cc0565b506001949350505050565b60405162461bcd60e51b815260206004820152602f60248201527f556e737570706f727465642063616c6c6261636b202d204265666f726520416760448201527f7265656d656e7420437265617465640000000000000000000000000000000000606482015260609060840161054b565b3360008181526001602090815260408083206001600160a01b03871684529091528120549091906104d4908290869061062390879061121a565b610ad6565b60405162461bcd60e51b815260206004820152603160248201527f556e737570706f727465642063616c6c6261636b202d2041667465722041677260448201527f65656d656e74205465726d696e61746564000000000000000000000000000000606482015260609060840161054b565b60405162461bcd60e51b815260206004820152603360248201527f556e737570706f727465642063616c6c6261636b202d20204265666f7265204160448201527f677265656d656e74205465726d696e6174656400000000000000000000000000606482015260609060840161054b565b6006546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a08231906024015b60206040518083038186803b15801561074f57600080fd5b505afa158015610763573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610787919061115f565b905090565b60405162461bcd60e51b815260206004820152602f60248201527f556e737570706f727465642063616c6c6261636b202d204265666f726520416760448201527f7265656d656e7420757064617465640000000000000000000000000000000000606482015260609060840161054b565b60606004805461044390611271565b8061081a620f424084611252565b6108249190611232565b600755600e829055600f81905561083b8183611252565b600d55600c5550565b3360008181526001602090815260408083206001600160a01b0387168452909152812054909190838110156108e15760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161054b565b61056d8286868403610ad6565b6000336104d4818585610cc0565b60055460009082906001600160a01b038083169116148061092a57506006546001600160a01b038281169116145b6109645760405162461bcd60e51b815260206004820152600b60248201526a1393d517d25397d413d3d360aa1b604482015260640161054b565b5092915050565b60405162461bcd60e51b815260206004820152602e60248201527f556e737570706f727465642063616c6c6261636b202d2041667465722041677260448201527f65656d656e742043726561746564000000000000000000000000000000000000606482015260609060840161054b565b6005546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401610737565b60055460009082906001600160a01b0380831691161480610a3b57506006546001600160a01b038281169116145b610a755760405162461bcd60e51b815260206004820152600b60248201526a1393d517d25397d413d3d360aa1b604482015260640161054b565b6005546001600160a01b0384811691161415610ab357610aac600e54610aa686600f54610ed790919063ffffffff16565b90610eea565b9150610964565b610ace600f54610aa686600e54610ed790919063ffffffff16565b949350505050565b6001600160a01b038316610b515760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161054b565b6001600160a01b038216610bcd5760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161054b565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6001600160a01b038381166000908152600160209081526040808320938616835292905220546000198114610cba5781811015610cad5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161054b565b610cba8484848403610ad6565b50505050565b6001600160a01b038316610d3c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161054b565b6001600160a01b038216610db85760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161054b565b6001600160a01b03831660009081526020819052604090205481811015610e475760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161054b565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610e7e90849061121a565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610eca91815260200190565b60405180910390a3610cba565b6000610ee38284611252565b9392505050565b6000610ee38284611232565b60008083601f840112610f07578182fd5b50813567ffffffffffffffff811115610f1e578182fd5b602083019150836020828501011115610f3657600080fd5b9250929050565b600060208284031215610f4e578081fd5b8135610ee3816112c2565b60008060408385031215610f6b578081fd5b8235610f76816112c2565b91506020830135610f86816112c2565b809150509250929050565b600080600060608486031215610fa5578081fd5b8335610fb0816112c2565b92506020840135610fc0816112c2565b929592945050506040919091013590565b60008060408385031215610fe3578182fd5b8235610fee816112c2565b946020939093013593505050565b600080600080600080600060a0888a031215611016578283fd5b8735611021816112c2565b96506020880135611031816112c2565b955060408801359450606088013567ffffffffffffffff80821115611054578485fd5b6110608b838c01610ef6565b909650945060808a0135915080821115611078578384fd5b506110858a828b01610ef6565b989b979a50959850939692959293505050565b600080600080600080600080600060c08a8c0312156110b5578182fd5b89356110c0816112c2565b985060208a01356110d0816112c2565b975060408a0135965060608a013567ffffffffffffffff808211156110f3578384fd5b6110ff8d838e01610ef6565b909850965060808c0135915080821115611117578384fd5b6111238d838e01610ef6565b909650945060a08c013591508082111561113b578384fd5b506111488c828d01610ef6565b915080935050809150509295985092959850929598565b600060208284031215611170578081fd5b5051919050565b60008060408385031215611189578182fd5b823591506020830135610f86816112c2565b600080604083850312156111ad578182fd5b50508035926020909101359150565b60008151808452815b818110156111e1576020818501810151868301820152016111c5565b818111156111f25782602083870101525b50601f01601f19169290920160200192915050565b602081526000610ee360208301846111bc565b6000821982111561122d5761122d6112ac565b500190565b60008261124d57634e487b7160e01b81526012600452602481fd5b500490565b600081600019048311821515161561126c5761126c6112ac565b500290565b600181811c9082168061128557607f821691505b602082108114156112a657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6001600160a01b03811681146112d757600080fd5b5056fea2646970667358221220dda7b1715965eb85929c0bd8256a518a4d87142f5e675d3fe46e6fcf1ea5346064736f6c63430008040033";

type StreamSwapConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StreamSwapConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StreamSwap__factory extends ContractFactory {
  constructor(...args: StreamSwapConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    _token1: string,
    _token2: string,
    host: string,
    cfa: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<StreamSwap> {
    return super.deploy(
      _token1,
      _token2,
      host,
      cfa,
      overrides || {}
    ) as Promise<StreamSwap>;
  }
  getDeployTransaction(
    _token1: string,
    _token2: string,
    host: string,
    cfa: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _token1,
      _token2,
      host,
      cfa,
      overrides || {}
    );
  }
  attach(address: string): StreamSwap {
    return super.attach(address) as StreamSwap;
  }
  connect(signer: Signer): StreamSwap__factory {
    return super.connect(signer) as StreamSwap__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StreamSwapInterface {
    return new utils.Interface(_abi) as StreamSwapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StreamSwap {
    return new Contract(address, _abi, signerOrProvider) as StreamSwap;
  }
}
