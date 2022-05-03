({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {  
                label: "Name",  
                fieldName: "recordLink",  
                type: "url",  
                typeAttributes: { label: { fieldName: "Name" }, tooltip:"Name", target: "_blank" },
                sortable: true
            },  
            {label: 'Phone', fieldName: 'Phone', type: 'text',editable:'true'},
            {label: 'Website', fieldName: 'Website', type: 'text',editable:'true'},
            {label: 'AnnualRevenue', fieldName: 'AnnualRevenue',type: 'currency', typeAttributes: { currencyCode: 'USD'},editable:'true'},
            {label: 'Owner Name', fieldName: 'OwnerName', type: 'text',sortable: true}]
                     );
        
        helper.fetchAccounts(component, event, helper);
        
    },
    onSave : function( component, event, helper ) {   
        
        var updatedRecords = component.find( "acctTable" ).get( "v.draftValues" );  
        var action = component.get( "c.updateAccts" );  
        action.setParams({"updatedAccountList":updatedRecords});
        var result =helper.actionHandler(component,action);
        result.then(
            $A.getCallback(function(response){
                console.log(response);
                
            }),
            $A.getCallback(function(error){
                component.set('v.isLoading', false);
                console.log(error);
                console.log('obj  '+JSON.stringify(error) );
            })
        );
        
    }  ,
    
    handleKeyUp: function (component, event, helper) {
        
        var isEnterKey = event.keyCode === 13;
        if (isEnterKey) {
            component.set('v.issearching', true);
            helper.fetchAccounts(component, event, helper);
            component.set('v.issearching', false);
        }
    },
    
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    }
    
})