import { LightningElement } from 'lwc';
import loadDataById from '@salesforce/apex/infiniteLoadController.loadDataById';
import loadMoreData from '@salesforce/apex/infiniteLoadController.loadMoreData';
import countOfAccounts from '@salesforce/apex/infiniteLoadController.countOfAccounts';

const columns = [
    { label: 'Account ID', fieldName: 'Id' },
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Account Industry', fieldName: 'Industry'},
    { label: 'Account Rating', fieldName: 'Rating'},
    { label: 'Active Status?', fieldName: 'Active__C'}
];

export default class InfiniteLoadingDataTable extends LightningElement {

    data = [];
    columns = columns;
    totalRecords = 0;
    recordLoaded = 0;

    connectedCallback(){

        this.loadData();
    }
    async loadData(){
        try{
        this.totalRecords = await countOfAccounts();
        this.data =  await loadDataById();
        this.recordLoaded = this.data.length;

        }catch(error){
            console.log("Error While Loading",error);

        }
        
    }
    async loadMoreData(event){
        try {
            const {target} = event;
            target.isLoading = true;
            let currentReconds = this.data;
            let lastRecord = currentReconds[currentReconds.length - 1];
            let newRecord = await loadMoreData({
                lastName: lastRecord.Name,
                lastId: lastRecord.Id
            });
            this.data = [...currentReconds,...newRecord];
            this.recordLoaded = this.data.length;
            target.isLoading = false;
        } catch (error) {
            
        }
    }
}