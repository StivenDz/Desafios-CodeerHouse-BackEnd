export class Container {
    private providers!: [{key:string,value:any}];
  
    public getDependency(key: string) {
      const matchedProvider = this.providers?.filter((prov)=> prov.key === key)[0]
  
      if (matchedProvider) {
        return matchedProvider.value;
      } else {
        throw new Error(`No provider found for ${key}!`);
      }
    }
    public addDependency(key: string,value:any){
        if(!this.providers){
            this.providers = [{key,value}]
            return
        }
        this.providers.push({key,value})
    }
  }
  
export const container = new Container();