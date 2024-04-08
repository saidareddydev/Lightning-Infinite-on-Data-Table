public with sharing class infiniteLoadController {

    @AuraEnabled(cacheable=true)
        public Static List<Account> loadDataById(){

            return [Select Id,Name,Industry,Rating.Active__C From Account ORDER By Name,Id Limit 500];

        }

        @AuraEnabled(cacheable=true)
        Public Static List<Account> loadMoreData(String lastName,String lastId){
            return [Select Id,Name,Industry,Rating From Account
            WHERE (Name > :lastName) OR (Name = :lastName AND Id > :lastId)
            ORDER By Name,Id
            LIMIT 500];
        }

        @AuraEnabled(cacheable=true)
        Public Static Integer countOfAccounts(){
            AggregateResult agr = [Select count(id) recordCount From Account];
                return (Integer)agr.get('recordCount');
        }
}