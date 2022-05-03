({
    actionHandler : function(component,action) {
        return new Promise(function (resolve, reject) {            
            action.setCallback(this, function (response) {                
                //alert(response.getState());                
                if (response.getState() === 'SUCCESS') {                    
                    resolve(response.getReturnValue());                    
                } else if(response.getState() === 'ERROR') {
                    //console.log(response.getError())
                    reject(response.getError());                    
                }                
            });
            $A.enqueueAction(action);            
        });
    },
    fetchAccounts: function (component, event, helper) {
        
        var action=component.get("c.getFinancialAccounts");
        var searchKey= component.get("v.searchKey");
        
        action.setParams({"byName":searchKey});
        var result =helper.actionHandler(component,action);
        result.then(
            $A.getCallback(function(response){
                console.log(response);
                //component.set("v.accounts",response);
                var tempOppList = [];  
                for (var i = 0; i < response.length; i++) {  
                    let tempRecord = Object.assign({}, response[i]); //cloning object  
                    tempRecord.recordLink = "/" + tempRecord.Id;  
                    tempRecord.OwnerName =  tempRecord.Owner.Name;
                    tempOppList.push(tempRecord);  
                }  
                component.set("v.accounts",tempOppList);
            }),
            $A.getCallback(function(error){
                component.set('v.isLoading', false);
                console.log(error);
                console.log('obj  '+JSON.stringify(error) );
            })
        );
    },
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.accounts");
        var reverse = sortDirection !== 'asc';
        data.sort(this.sortBy(fieldName, reverse));
        cmp.set("v.accounts", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ?
            function(x) {return primer(x[field])} :
        function(x) {return x[field]};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },
    
    
})