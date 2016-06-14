import data from '../../../message.json';
class RenewData {
  constructor() {
    this.data = data;
  }
  renew(newData){if(newData!==undefined)this.data = newData;
  	return this.data;
  }
}

export default (new RenewData);