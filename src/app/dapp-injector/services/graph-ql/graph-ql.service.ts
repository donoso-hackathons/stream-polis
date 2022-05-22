import { Injectable, OnDestroy } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { BehaviorSubject, firstValueFrom, Subject, Subscription } from 'rxjs';
import { GET_DEMANDS, GET_OFFERS, GET_SUMMARY, GET_USER } from './queryDefinitions';



@Injectable({
  providedIn: 'root',
})
export class GraphQlService implements OnDestroy {
  constructor(private apollo: Apollo) {}
  ngOnDestroy(): void {}

  // watchOffers(id: string) {
  //   const variables = { id: id };
  //   return this.apollo.watchQuery<any>({
  //     query: gql(GET_OFFERS),
  //     pollInterval: 500,
  //     variables,
  //   }).valueChanges;
  // }

  watchUser(address: string) {
    const variables = { address: address.toLowerCase() };
    return this.apollo.watchQuery<any>({
      query: gql(GET_USER),
      variables,
    }).valueChanges;
  }

  async querySummary():Promise<any> {
    try {
 
      const posts = await  this.apollo
      .query<any>({
        query: gql(GET_SUMMARY)
      }).toPromise()
        

     
      return posts;
    } catch (error) {
      console.log(error);
      return {};
    }

  }



  async queryOffers():Promise<any> {
    try {
 
      const posts = await  this.apollo
      .query<any>({
        query: gql(GET_OFFERS)
      }).toPromise()
        

     
      return posts;
    } catch (error) {
      console.log(error);
      return {};
    }

  }


  async queryDemands():Promise<any> {
    try {
 
      const posts = await  firstValueFrom(this.apollo
      .query<any>({
        query: gql(GET_DEMANDS)
      }))
        
      return posts;
    } catch (error) {
      console.log(error);
      return {};
    }

  }


  async queryTrades():Promise<any> {
    try {
 
      const posts = await  firstValueFrom(this.apollo
      .query<any>({
        query: gql(GET_DEMANDS)
      }))
        
      return posts;
    } catch (error) {
      console.log(error);
      return {};
    }

  }

}
