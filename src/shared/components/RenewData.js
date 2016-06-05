import data from '../../../message.json';
class RenewData {
  constructor() {
    this.data = data;
  }
  getData(){return this.data;}
  renew(newData){if(newData!==undefined)this.data = newData;
			return data;}
}

export default (new RenewData);