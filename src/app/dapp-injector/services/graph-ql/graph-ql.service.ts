import { Injectable, OnDestroy } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';
import { BehaviorSubject, firstValueFrom, Subject, Subscription } from 'rxjs';
import { GET_DEMANDS, GET_OFFERS } from './queryDefinitions';



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

  queryUser(address: string) {
    const variables = { address: address.toLowerCase() };
    return this.apollo.watchQuery<any>({
      query: gql(GET_USER),
      variables,
    }).valueChanges;
  }


  async queryOffers():Promise<any> {
    try {
 
      const posts = await  firstValueFrom(this.apollo
      .query<any>({
        query: gql(GET_OFFERS)
      }))
        

     
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


  async queryTead():Promise<any> {
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
