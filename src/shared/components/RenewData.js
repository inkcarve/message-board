//import data from '../../../message.json';
class RenewData {
  constructor() {
    this.data = [];
  }
  renew(newData){
  	if(newData!==undefined)this.data = newData;
  	console.log(newData);
  	return this.data;
  }
}

export default (new RenewData);