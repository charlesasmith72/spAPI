///Jquery style selectors
const $ = selector  => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
 var  $AllLists = [];

///get SharePoint Site Data
  const  getSPUrl = async url =>{
   if (!url) url = window.location.href;
   if(url.includes('SiteAssets')) uri = url.substring(0,url.indexOf('SiteAssets'))+"_api/web/lists/getbytitle('Site%20Assets')?$select=ServerRelativeUrl";
           var fetchSite = await fetch(uri,{method: 'GET',headers: {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}})
           var response = await fetchSite.json();
           var responseURI = response.d.__metadata.uri;
           var searchParams = new URLSearchParams(new URL(url).search);
           var params = {};
               for(const [key, value] of searchParams.entries()){
                   params[key] = value;
               }
           var newURL = {"URL":responseURI.substring(0,responseURI.indexOf("/_api")),"Parameters":params};
           return newURL;
    }
 ///get SharePoint Site Permissions
 ///get SharePoint Site Groups
 ///get SharePoint List Columns
    const getSPListColumns = async (listName,url) =>{
            if(!url) spURI = "../../_api/web/lists/getbytitle('"+listName+"')/fields";
            if(url) spURI = url
        var fetchList = await fetch(spURI,{method: 'GET',headers: {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}})
        var response = await fetchList.json();
            return response.d.results;
    }
 ///get SharePoint List Permissions
    const getSPListPermissions = async (listName,url) =>{
            if(!url) spURI = "../../_api/web/lists/getbytitle('"+listName+"')/RoleAssignments?$expand=Member,RoleDefinitionBindings,__metadata";
            if(url) spURI = url
        var fetchList = await fetch(spURI,{method: 'GET',headers: {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}})
        var response = await fetchList.json();
              return response.d.results;
    }
///get SharePoint List Data
const getSPListData = async (listName,url) =>{
            if(!url) spURI = "../../_api/web/lists/getbytitle('"+listName+"')?$expand=Fields,RoleAssignments/Member,RoleDefinitionBindings,__metadata";
            //if(!url) spURI = "../../_api/web/lists/getbytitle('"+listName+"')?$expand=Items,Fields,RoleAssignments/Member,RoleDefinitionBindings,__metadata";
            if(url) spURI = url
        var fetchList = await fetch(spURI,{method: 'GET',headers: {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}})
        var response = await fetchList.json();
            return response.d;

    }

///create SharePoint List Object
 class SPList {
     constructor(listName,Data,fetchURL){
       if(!listName){ this.Name ="Undefined List Name"; return};
       if(!Data){ this.Name =listName;this.Data = ""; return};
         this.Name =listName;
         this.Data = Data ;
         this.fetchURL = fetchURL;
            if(fetchURL){
                this.listURL = fetchURL.substring(0,fetchURL.indexOf('/_api'));
            }else{
                this.listURL = Data.__metadata.uri.substring(0,Data.__metadata.uri.indexOf('/_api'));
            }

     }
     watch(returnFunction){};
     permissions(){
       var listPermissions = this.Data.RoleAssignments.results;
             return listPermissions;
             }
     fields(){
       var listFields = this.Data.Fields.results;
            return listFields;
     };
     async getItems(url,digestURL){
        var digest;
        if(!digestURL){
          digest = await getDigest(this.listURL);
        }else{
         digest = await getDigest(digestURL);
        }
        if(!url) url = this.listURL+"/_api/web/Lists/getbytitle('"+this.Name+"')/items?$top=30000000"
        const Fetch = await fetch(url,
                            {   method: "GET",
                                headers: {
                                            "Accept": "application/json;odata=verbose",
                                            "Content-Type": "application/json;odata=verbose",
                                            "X-RequestDigest": digest,
                                         },
                            })
                            const response = await Fetch.json();
                            return response.d.results;
      }
     async newItem(saveData,url,digestURL){
       if(!saveData && typeof saveData !== "object" ){
           throw new Error('Missing or invalid Item Array. This function only excepts an array of save objects. for Example:[{Title:"New"}]');
           return;
       }
       var digest;
       if(!digestURL){
         digest = await getDigest(this.listURL);
       }else{
        digest = await getDigest(digestURL);
       }


       var metaType = this.Data.ListItemEntityTypeFullName;
       var data =  {"__metadata": {"type": metaType}};
           saveData.forEach((valuePair,index)=>{
               let key = Object.keys(valuePair)[0];
               let value = valuePair[key];
               data[key] = value;
           })

           if(!url) url = this.listURL+"/_api/web/Lists/getbytitle('"+this.Name+"')/items"
       const saveFetch = await fetch(url,
                           {   method: "POST",
                               headers: {
                                           "Accept": "application/json;odata=verbose",
                                           "Content-Type": "application/json;odata=verbose",
                                           "X-RequestDigest": digest,
                                           "IF-MATCH": "*",
                                           "X-HTTP-Method": "POST"
                                        },
                                body: JSON.stringify(data)
                           })
     const response = await saveFetch.json()
                       return response.d;
     }
     async editItem(itemID,saveData,url,digestURL){
       if(!saveData && typeof saveData !== "object" && !itemID ){
           throw new Error('Missing or invalid Item Array. This function only excepts an array of save objects. for Example:[{Title:"New"}]');
           return;
       }
       var digest;
       if(!digestURL){
         digest = await getDigest(this.listURL);
       }else{
        digest = await getDigest(digestURL);
       }

       var metaType = this.Data.ListItemEntityTypeFullName;
       var data =  {"__metadata": {"type": metaType}};
           saveData.forEach((valuePair,index)=>{
               let key = Object.keys(valuePair)[0];
               let value = valuePair[key];
               data[key] = value;
           });
           if(!url) url = this.listURL+"/_api/web/Lists/getbytitle('"+this.Name+"')/items("+itemID+")"
           const saveFetch = await fetch(url,
                           {   method: "PATCH",
                               headers: {
                                           "Accept": "application/json;odata=verbose",
                                           "Content-Type": "application/json;odata=verbose",
                                           "X-RequestDigest": digest,
                                           "IF-MATCH": "*",
                                           "X-HTTP-Method": "MERGE"
                                        },
                                body: JSON.stringify(data)
                           })

                               return saveFetch;
     }
    async getItem(itemID,url,digestURL){
       if(!itemID ){
           throw new Error('Missing or invalid Item ID');
           return;
       }
       var digest;
       if(!digestURL){
         digest = await getDigest(this.listURL);
       }else{
        digest = await getDigest(digestURL);
       }
       if(!url) url = this.listURL+"/_api/web/Lists/getbytitle('"+this.Name+"')/items("+itemID+")"
       const Fetch = await fetch(url,
                           {   method: "GET",
                               headers: {
                                           "Accept": "application/json;odata=verbose",
                                           "Content-Type": "application/json;odata=verbose",
                                           "X-RequestDigest": digest,
                                        },
                           })
                           const response = await Fetch.json();
                           return response.d;
     }
     async deleteItem(itemID,url,digestURL){
       if(!itemID ){
           throw new Error('Missing or invalid Item ID');
           return;
       }
       var digest;
       if(!digestURL){
         digest = await getDigest(this.listURL);
       }else{
        digest = await getDigest(digestURL);
       }
       if(!url) url = this.listURL+"/_api/web/Lists/getbytitle('"+this.Name+"')/items("+itemID+")"
       const deleteFetch = await fetch(url,
                           {   method: "POST",
                               headers: {
                                           "Accept": "application/json;odata=verbose",
                                           "Content-Type": "application/json;odata=verbose",
                                           "X-RequestDigest": digest,
                                           "IF-MATCH": "*",
                                           "X-HTTP-Method": "DELETE"
                                        },
                           })

                               return deleteFetch;
     }
 }
   ///get All list Data and create new list object
 const $SPList = async (listName,url) =>{
       if(url) spURI = url;
           var fetchListData = await getSPListData(listName,url);
           var spListOBJ = await new SPList(listName,fetchListData,url)
            $AllLists.push(spListOBJ);
               return spListOBJ;
    }

///create SharePoint Item Object
class $SPItem {
     constructor(columnName,listName,selector,fieldName){
       if(!columnName){
           throw new Error('Missing or invalid item ID');
           return;
       }
       this.Name = columnName;
       if(!fieldName){
        this.fieldName = columnName
       }else{
        this.fieldName = fieldName
       }
       if(!listName){
           listName = 'Unknown';
       }
           this.listName = listName;
           var thisListName;
           var thisListData;
           $AllLists.forEach((list, listIndex)=>{
            if(listName == list.Name ){
                thisListName  = list.Name;
                thisListData = list;
               }
            });

            var listFieldArray  = thisListData.Data.Fields.results;
            var fieldFound = false;
            listFieldArray.forEach((field,fieldIndex)=>{
                if(field.EntityPropertyName === columnName ){
                    fieldFound= true;
                    this.spColumn = field;
                    this.type = field.__metadata.type;
                    this.typeAsString = field.TypeAsString;
                }

            })
            if(!fieldFound){
                listFieldArray.forEach((field,fieldIndex)=>{
                    if(field.Title === columnName && !fieldFound){
                        this.spColumn = field;
                        this.type = field.__metadata.type;
                        this.typeAsString = field.TypeAsString;
                    }
                })
            }




           if(!selector){
               this.selector = 'None';
               this.required = false;
           }else{
               let currentField = $$(selector)[0];
               this.tag = currentField.tagName;
                   if(currentField.tagName == "INPUT"){
                       this.inputType = currentField.type;
                   }
               //check if Required
               var isRequired = false;
               $$(selector).forEach((field)=>{
                     if(field.hasAttribute("required")) {
                               isRequired = true;
                     }
                   })

               this.required = isRequired;
               this.selector = selector;
           }



            this.validator = [requiredValidation]

     }
     getChoices(){
         var spItemChoices;
         if(!('Choices' in this.spColumn)){
           spItemChoices = [];
         }else{
           spItemChoices = this.spColumn.Choices.results;
         }
         return spItemChoices;
     };
     async getLookUps(){
       var spItemLookUps;
       if(('LookupList' in this.spColumn)){
               const listGUID = this.spColumn.LookupList.substring(1,this.spColumn.LookupList.indexOf('}'));
               const lookUpColumn = this.spColumn.LookupField;
               var spURI = "../../_api/web/lists(guid'"+listGUID+"')/items?$select=ID,"+lookUpColumn;
               var fetchList = await fetch(spURI,{method: 'GET',headers: {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}})
               var response = await fetchList.json();
                   spItemLookUps =  response.d.results;
       }else{
           spItemLookUps = []
       }
       return spItemLookUps;
     };
     getDefault(){
       var spDefault;
       if(('DefaultValue' in this.spColumn)){
           spDefault = this.spColumn.DefaultValue;
       }else{
           spDefault = "";
       }
       return spDefault;
     };
     field(){
         var formFields = '';
         if(this.selector.indexOf('#') == 0){
         formFields = $(this.selector);
         }else{
         formFields = $$(this.selector);
         }
         return formFields
     };
     fieldVal(){
       if(this.selector == 'None'){
           var nonValue = '';
           return nonValue;
       } ;



           if( this.tag == "INPUT"){
               if(this.inputType == 'radio'){
                   var selectedRadio = $$('input'+this.selector+':checked');
                   var radioValues =[];
                   selectedRadio.forEach((radio,radioIndex)=>{
                       radioValues.push(radio.value);
                     });
                     return radioValues;
               }else if(this.inputType == 'checkbox'){
                 var selectedCBX = $$('input'+this.selector+':checked');
                 var cbxValues = [];
                     selectedCBX.forEach((cbx,cbxIndex)=>{
                       cbxValues.push(cbx.value);
                     });
                     return cbxValues;
               }else{
                   if(this.selector.indexOf('#') == 0){
                      return $('input'+this.selector).value;
                   }else{
                        var inputValues =[];
                        $$('input'+this.selector).forEach((input,inputIndex)=>{
                           inputValues.push(input.value);
                        })
                       return inputValues;
                   }
               }
           }else if(this.tag =='SELECT'){
               if(this.selector.indexOf('#') == 0){
                   var dropDown =  $(this.selector);
                      if(dropDown.multiple){
                         var dropDownOptions = $$(this.selector+' option[selected]');
                         var dropDownValues =[];
                         dropDownOptions.forEach((option,optionIndex)=>{
                           dropDownValues.push(option.value)
                         })

                         return dropDownValues
                      }else{

                        return $(this.selector).value;
                      }
               }else{
                   var dropDownValues =[];
                       $$(this.selector+' option[selected]').forEach((select, selectIndex)=>{
                             dropDownValues.push(select.value);
                       });
                       return dropDownValues;
              }

           }else if(this.tag =='TEXTAREA'){
                if(this.selector.indexOf('#') == 0){
                       return $(this.selector).value;
                    }else{
                        var inputValues =[];
                        $$(this.selector).forEach((text,textIndex)=>{
                           inputValues.push(text.value);
                        })
                       return inputValues;
                 }

           }
     };
     prep(saveValue,staticName){
        if(!staticName &&  !('spColumn' in this)) {
            throw new Error('Missing the SharePoint column for '+this.Name);
            return;
        }
       if(!staticName) staticName = this.spColumn.StaticName;
       if(!saveValue) saveValue = this.fieldVal();
            if(this.type == "SP.FieldLookup" ){
                staticName = staticName+'Id';
                  if(typeof saveValue === 'object'){
                    saveValue = {"results":saveValue};
                  }else{
                    saveValue = {"results":[saveValue]};
                  }
            }else if(this.type == "SP.FieldMultiChoice"){
                if(typeof saveValue === 'object'){
                    saveValue = {"results":saveValue};
                  }else{
                    saveValue = {"results":[saveValue]};
                  }
            }else if(this.type == "SP.FieldChoice" || this.type == "SP.FieldText"){
                  if(typeof saveValue === 'object'){
                    saveValue = saveValue.toString();
                  }
            }else if(this.type == "SP.Field" && this.typeAsString == "Boolean"){
                  if(typeof saveValue === 'object'){
                    saveValue = saveValue.toString();
                  }
                  if(saveValue && saveValue.trim() !==''){
                       saveValue = true;
                  }else{
                    saveValue = false
                  }

            }
       this.savePair = {[staticName] : saveValue};
           return this.savePair;
     };



 }

   ///Get SharePoint Digest
   async function getDigest(url){
       var  currentSite =url;
       if(!url) {
           fetchURL =  await getSPUrl();
           currentSite = fetchURL.URL;
       }

       var fetchData = await fetch(currentSite+"/_api/contextinfo",
                                   {method: 'Post',
                                   headers: {"accept": "application/json; odata=verbose"}
                                   })
       var fetchJson = await fetchData.json();
       var FormDigestValue = fetchJson.d.GetContextWebInformation.FormDigestValue;
       return FormDigestValue ;
   }
 class ValidationReturn  {
    constructor(validationField,result,message){
        this.validationField =validationField;
        this.result = result;
        this.message = message;
    }
}
 const requiredValidation = (fieldOBJ)=>{
   if(!fieldOBJ){
           throw new Error('Missing or invalid field Object');
           return;
       }

     var field = fieldOBJ.field;
     var fieldName = fieldOBJ.field.fieldName;
     var fieldSelector = field.selector;
     var fieldValue = field.fieldVal();
     var isRequired = field.required;
     var inputType = field.inputType;
     var isValid = true;

     if(isRequired){
           if(typeof fieldValue === "object"){
               if(fieldValue.length == 0){
                isValid = false;
               }else{
               fieldValue.forEach((value)=>{
                  if(value =="" || value == undefined || value.trim() ===''){
                   isValid = false;
                  }
               })
            }
           }else{
               if(fieldValue =="" || fieldValue == undefined || fieldValue.trim() ===''){
                   isValid = false;
                  }
           }
     }

           var validationFieldSelector = $('[validationID ="'+fieldOBJ.validatorID+'"]');
           var validationLink = "#";
           if(validationFieldSelector !== null){
                 if(validationFieldSelector.hasAttribute('id')){
                    validationLink = "#"+validationFieldSelector.id;
                 }
              }
            ///create validation hyper link message
           var validationMessage ='<span class="spValidation-error"><a href="'+validationLink+'">'+fieldName+'</a> is a required field and cannot be blank. ALL fields with an asterisk (<span style="color:red">*</span>) are required</span>';
           var returnValue = new ValidationReturn(fieldOBJ.validatorID,isValid,validationMessage);
               return returnValue;
 };

 const spValidate   =  (filedArray)=>{
    if(!filedArray && typeof filedArray !== 'object' ){
     throw new Error('This function requires all fields to be submitted as an Array ');
    };
    ///remove all validation id attributes
     const previousElements = $$('[validationID]');
           previousElements.forEach(input =>{
               input.removeAttribute('validationID')
           })
           var validatorArray = [];
    filedArray.forEach((field, fieldIndex)=>{
       var fieldName = field.Name;
          if(field.selector !== undefined && field.selector !== 'None' && field.selector !== ''){
           var fieldSelector = field.selector;
           var validatorID = fieldIndex;
               if(fieldSelector.indexOf('#') == 0){
                 var validationOption =  $(fieldSelector);
                       validationOption.setAttribute("validationID",validatorID);
                       validatorArray.push({"validatorID":validatorID.toString(),"field":field});
               }else{
                 var selectorArray = [];
                    $$(fieldSelector).forEach((fieldOPT,fieldOPTIndex)=>{
                        var validationOptionID = validatorID+'-opt'+fieldOPTIndex;
                        fieldOPT.setAttribute("validationID",validationOptionID);
                        validatorArray.push({"validatorID":validationOptionID,"field":field});
                    })
               }
          }
    })


               ///Validate All Fields in array unassignedID
               var returnArray =[];
               validatorArray.forEach(fieldOBJ =>{
                 var validationFieldSelector = $('[validationID ="'+fieldOBJ.validatorID+'"]');

                  var validatorID = fieldOBJ.validatorID;
                  var validationFunctions  = fieldOBJ.field.validator;
                  if(validationFieldSelector !== null){
                       validationFunctions.forEach(runValidator =>{
                              var returnValue = runValidator(fieldOBJ);
                             returnArray.push(returnValue);
                       });
                    }
               });
               return returnArray;


}



class $ErrorInit{
    constructor(errorContainer,errorList,validationErrorList){
       if(!errorContainer || !errorList || !validationErrorList){
       throw new Error('This class requires the following parameters errorContainer, errorList and validationErrorList');
       return;
   }
         this.container = $(errorContainer);
         this.errorList = $(errorList);
         this.validationList = $(validationErrorList);
    }
   message(errorOBJ,validation){
     var isValid = true;

     var validationID =[];
     if(!validation){
        this.errorList.innerHTML ="";
        errorOBJ = [{'message':errorOBJ}]
     }else{
        this.validationList.innerHTML ="";
     }
        errorOBJ.forEach((error)=>{
           var errorMessage = error.message;

           if(validation ){
                if(!error.result ){
                 isValid = error.result;
                 var errorMessageHTML;
                 var errorInput = $('[validationid="'+error.validationField+'"]')
                 var errorLabel = $('label[for="'+errorInput.id+'"]');
                 if(error.validationField.includes('opt')){
                    var validationFieldID = error.validationField.substring(0,error.validationField.indexOf('-opt'));
                    errorLabel = $('label[labelfor="'+errorInput.id+'"]');
                    var errorLabelOption = $('label[for="'+errorInput.id+'"]');
                         errorLabelOption.classList.add('errorLabel')

                    if(!validationID.includes(validationFieldID)){
                       validationID.push(validationFieldID);
                       errorMessageHTML = `<li  class="flex items-center font-lg">
                                            <svg class="w-4 h-4 mr-1.5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                              <span  class="spValidation-error"><a href="#${errorInput.id}">${errorLabel.innerHTML}</a> requires a selected option. ALL fields with an asterisk (<span style="color:red">*</span>) are required</span>
                                           </li>`;
                    }

                 }else{

                    errorMessageHTML = `<li  class="flex items-center font-lg">
                                      <svg class="w-4 h-4 mr-1.5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                      ${errorMessage}
                                   </li>`;
                 }
                  //add validation errors
                   if(errorInput) errorInput.classList.add('errorInput');
                   if(errorLabel) errorLabel.classList.add('errorLabel')

                 var newListItem = document.createElement("li");
                    newListItem.innerHTML = errorMessageHTML;
                   if(errorMessageHTML) this.validationList.appendChild(newListItem);
                   ////show container and focus
                        this.container.classList.remove('hidden');
                        this.container.focus();

               }
           }else if(!validation){
              var errorMessage = error.message;
              var errorMessageHTML = `<li  class="flex items-center font-lg">
                                      <svg class="w-4 h-4 mr-1.5 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
                                      ${errorMessage}
                                   </li>`;
                 var newListItem = document.createElement("li");
                    newListItem.innerHTML = errorMessageHTML;
                    this.errorList.appendChild(newListItem);
                    ////show container and focus
                    this.container.classList.remove('hidden');
                        this.container.focus();

           }
        });


        if(validation){
           //alert('<b>Form Error</b>!: Please correct the list of form errors listed in the Form Errors section')
           return isValid;
        }
        //alert('<b>Error!</b>: Please view the form error(s) listed in the Form Errors section')
          return true;
    }
   clear(validation, keepContainer){


     if(!validation){
        this.errorList.innerHTML ="";
     }else{
        this.validationList.innerHTML ="";
        var currentValidationInputs = $$('.errorInput');
     if(currentValidationInputs){
           currentValidationInputs.forEach((input)=>{
              input.classList.remove('errorInput')
           })
        }
     var currentValidationLabels = $$('.errorLabel');
        if(currentValidationLabels){
        currentValidationLabels.forEach((input)=>{
              input.classList.remove('errorLabel')
           })
        }
     }

     if(!keepContainer) this.container.classList.add('hidden');

   }

  }



  class $SuccessInit{
    constructor(container){
     if(!container){
       throw new Error('This class requires a Container parameter');
       return;
   }
         this.container = $(container);
    }
  message(message){
   const newMessage =
       ` <div id="alert-3" class="flex p-4 mb-4 text-green-800 rounded-lg bg-green-50   " role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5"   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
           <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
           </svg>
           <span class="sr-only">Info</span>
           <div class="ml-3 text-xl font-semibold">
           ${message}
           </div>
        </div>`

        var newAlert = document.createElement("div");
        newAlert.innerHTML = newMessage;
                this.container.appendChild(newAlert);
                this.container.focus();

  }
  clear(){
     this.container.innerHTML ="";
  }
}


async function getCurrentUserInfo(){

  const currentSiteSPURL = await getSPUrl();
  const url = currentSiteSPURL.URL
  const apiURI = url+'/_api/web/currentuser';
  const headers =  new Headers();
        headers.append('Accept',"application/json;odata=verbose");
        headers.append("Content-Type","application/json;odata=verbose")
       // {"accept": "application/json; odata=verbose","Content-Type":"application/json;odata=verbose"}
  const response = await fetch(apiURI,{
           method:"GET",
           headers: headers
  })
   const data = await response.json();
         return data.d
}

function convert_EmailText(sourceText,varInput){

  var convertedString = "";
      if(!sourceText) return sourceText = convertedString;
      if(!varInput) return sourceText;
      convertedString = sourceText;
      for (const obj of varInput){
         const objKeys = Object.keys(obj);

         objKeys.forEach(function(varItemKey,varIndex){
          var varItemValue = obj[varItemKey]
          var newRegEx  =  new RegExp("@{"+varItemKey+"}",'g');
            convertedString = convertedString.replace(newRegEx,varItemValue);
         });
      }
      return convertedString;
}

const  newIRAP_Alert = async (IRAPAppID,alertTemplateID,emailGlobalVariables) =>{
  /////configure Alert Lists
const spAlertList = await $SPList('Alerts',"https://irsgov.sharepoint.com/sites/IRAPapps/_api/web/lists(guid'e3542188-e0db-43a9-a9e1-7eb19f0f0c82')?$expand=Fields,Items");
const spAlertTemplates = await $SPList('Alert Templates',"https://irsgov.sharepoint.com/sites/IRAPapps/_api/web/lists(guid'a799f0c7-3965-4851-b96b-323d2be7da86')?$expand=Fields");




  var emailVariables = emailGlobalVariables;

   ///prepare save pairs
var spAlertFields =[
                    {"TemplateId": alertTemplateID}
                   ]

 ///get Template Values
  const EMailTemplate = await spAlertTemplates.getItem(alertTemplateID);
      spAlertFields.push({"Title":convert_EmailText(EMailTemplate.Title,emailVariables)});
      var Tostr = EMailTemplate.To; if(!Tostr) Tostr = '';
      var Ccstr = EMailTemplate.Cc; if(!Ccstr) Ccstr = '';
      var Bccstr = EMailTemplate.Bcc; if(!Bccstr) Bccstr = '';
      var Fromstr = EMailTemplate.From; if(!Fromstr) Fromstr = '';
      if(Tostr.includes('@')){
      spAlertFields.push({"To":convert_EmailText(EMailTemplate.To,emailVariables)});
      }
      if(Ccstr.includes('@')){
      spAlertFields.push({"Cc":convert_EmailText(EMailTemplate.Cc,emailVariables)});
      }
      if(Bccstr.includes('@')){
      spAlertFields.push({"Bcc": convert_EmailText(EMailTemplate.Bcc,emailVariables)});
      }
      if(Fromstr.includes('@')){
        spAlertFields.push({"From": convert_EmailText(EMailTemplate.From,emailVariables)});
        }
      var emailBody = EMailTemplate.Body;
      if(emailBody == null){emailBody = ''
           }else{
                emailBody = convert_EmailText(emailBody,emailVariables);
                }
      spAlertFields.push({"Body":emailBody});




        ///save new Item
       const saveFetch = await spAlertList.newItem(spAlertFields);
       console.log(saveFetch)
   }

