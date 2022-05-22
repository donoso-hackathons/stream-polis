export interface IUSER {};


export interface ILOAN_OFFER {
    id: string;
    loanMaxAmount:number;
    loanMinAmount:number;
    fee:number;
    superToken: string;
    collateralShare:number;
    maxDuration:number;
    loanProvider: string;
    status:number;
}

export interface ILOAN_TRADE {
    id: string;
    loanAmount:number;
    loanTotalAmount:number;
    collateral:number;
    collateralShare:number;
    initTimestamp:number;
    flowRate:number;
    fee:number;
    status:number;
    loanTaker: string;
    loanProvider: string;
    superToken: string;
    duration:number;
   
}