public class FinancialServicesAccountController {
    
    public static  string FinancialServices = 'Financial Services';
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getFinancialAccounts(String byName){
        
        if(String.isNotBlank(byName)){
            String searchByName = '%'+byName+'%';
            return [SELECT Id,Name,  OwnerId,Owner.Name, Phone, Website, AnnualRevenue
                    FROM ACCOUNT
                    WHERE  Industry =:FinancialServices
                    AND Name LIKE :searchByName
                    WITH SECURITY_ENFORCED];
        }
        
        return [SELECT Id,Name,  OwnerId,Owner.Name, Phone, Website, AnnualRevenue
                FROM ACCOUNT
                WHERE  Industry =:FinancialServices
                WITH SECURITY_ENFORCED];
        
    }
    
    @AuraEnabled
    public static String updateAccts(List<Account> updatedAccountList ){
        try{
            update updatedAccountList;
            return 'Success';
        }catch(Exception ex){
            return string.valueOf(ex);
        }
    }
    
}