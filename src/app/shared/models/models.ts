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