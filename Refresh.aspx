<%@ Page masterpagefile="IRAP.master" language="C#" title="Request for Adaptive Equipment Refresh" %>
<asp:Content id="Content1" runat="Server" contentplaceholderid="ContentPlaceHolder1">


<h1 class="font-extrabold text-2xl text-blue-900 ">Request for Adaptive Equipment Refresh</h1>
<p class="my-2">This form should only be used to request a replacement of equipment previously ordered by IRAP or additional training.</p>
<p class="my-2">Please note that all fields must be completed prior to submitting. Select 'Submit' to email the completed form to IRAP and a representative will make an initial contact within one business day.</p>
  <!---Validation-->
  <div id="formValidation" tabindex="0" class="p-4 my-4  text-red-800 rounded-lg bg-red-50 hidden" role="alert">
   <h2 class="font-bold text-red-600 font-extrabold text-xl">Form Errors!</h2>
   <ul id="spValidation-List" class="space-y-1 text-red-600 list-inside  ">

   </ul>
   <ul id="error-List"  class="space-y-1 text-red-600 list-inside  ">

   </ul>

</div>
<!----Success Alerts-->
 <div id="successAlerts" tabindex="1" >

 </div>
<div  class="grid grid-cols-6 gap-2  items-center   w-3/4">
   <div class="col-span-6">
      <p class="mb-2"><strong>Note:</strong> ALL fields with an asterisk (<span class="text-red-700 font-bold">*</span>) are <u>required</u></p>
   </div>
</div>
<div class="w-full  bg-white border border-gray-200 rounded-lg shadow mb-5">
   <h2 class="font-bold m-6 text-blue-900 text-lg">Requestor Information:</h2>
   <hr  class="h-px bg-gray-200 border-0 dark:bg-gray-700 shadow">
      <div class="grid grid-cols-6 gap-2  items-center p-6 w-3/4 ">
            <!----Row 1-->
            <div  class="col-span-2">
               <label for="SEID" class="block mb-2 text-sm font-bold text-gray-900  ">Employee SEID <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required type="text" id="SEID" maxlength="5" class="font-bold w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "  required>
            </div>
            <!----Row 2-->
            <div  class="col-span-2">
               <label for="Organization" class="block mb-2 text-sm font-bold text-gray-900  ">Organization <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="Organization" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 3-->
            <div  class="col-span-2">
               <label for="Schedule" class="block mb-2 text-sm font-bold text-gray-900  ">Work Schedule <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4 ">
               <select required  id="Schedule" class="bg-gray-50 w-56 border border-gray-300 text-gray-900 text-sm font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option class="font-bold"  value="New Hire">New Hire</option>
                  <option class="font-bold"  value="Seasonal New Hire">Seasonal New Hire</option>
                  <option class="font-bold"  value="Contractor" >Contractor</option>
                  <option class="font-bold"  selected="selected" value="Permanent" >Permanent</option>
                  <option class="font-bold"  value="Seasonal">Seasonal</option>
                  <option class="font-bold"  value="Intermittent">Intermittent</option>
                  <option class="font-bold"  value="Part Time">Part Time</option>
                  <option class="font-bold"  value="Interm. Seas.">Interm. Seas.</option>
                  <option class="font-bold"  value="PT Seas.">PT Seas.</option>
                  <option class="font-bold"  value="PT Job Share">PT Job Share</option>
                  <option class="font-bold"  value="PT Seas. Job Share">PT Seas. Job Share</option>
                </select>

            </div>
            <!----Row 4-->
            <div  class="col-span-2">
               <label labelfor="Category-1" class="block mb-2 text-sm font-bold text-gray-900  ">Disability Category <span class="text-red-700 font-bold">*</span><br>[Select all that Apply]</label>
            </div>

            <div class="col-span-4 mt-2">
               <div class="flex items-center mb-4">
                  <input required  id="Category-1" type="checkbox" value="Blindness" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="Category-1" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Blindness</label>
              </div>
              <div class="flex items-center mb-4">
               <input required  id="Category-2" type="checkbox" value="Deafness" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
               <label for="Category-2" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Deafness</label>
              </div>
               <div class="flex items-center mb-4">
                  <input required  id="Category-3" type="checkbox" value="Hard of Hearing" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="Category-3" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Hard of Hearing</label>
               </div>
               <div class="flex items-center mb-4">
                  <input required  id="Category-4" type="checkbox" value="Learning Disability" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="Category-4" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Learning Disability</label>
               </div>
               <div class="flex items-center mb-4">
                  <input required  id="Category-5" type="checkbox" value="Low Vision" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="Category-5" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Low Vision</label>
               </div>
               <div class="flex items-center mb-4">
                  <input required  id="Category-6" type="checkbox" value="Mobility" class="disability-cbx w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                  <label for="Category-6" class="ml-2 text-sm font-bold text-gray-900 dark:text-gray-300">Mobility</label>
               </div>
            </div>
            <!----Row 5-->
            <div  class="col-span-2">
               <label for="EmployeeName" class="block mb-2 text-sm font-bold text-gray-900  ">Employee Name <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="EmployeeName" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 6-->
            <div  class="col-span-2">
               <label for="EmployeeEmail" class="block mb-2 text-sm font-bold text-gray-900  ">Employee Email <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(name@irs.gov)</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="email" id="EmployeeEmail" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 7-->
            <div  class="col-span-2">
               <label for="EmployeePhone" class="block mb-2 text-sm font-bold text-gray-900  ">Employee Phone Number <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(###-###-####)</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="tel" id="EmployeePhone" class="font-bold w-56  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 8-->
            <div  class="col-span-2">
               <label for="ManagerName" class="block mb-2 text-sm font-bold text-gray-900  ">Manager Name <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="ManagerName" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 9-->
            <div  class="col-span-2">
               <label for="ManagerPhone" class="block mb-2 text-sm font-bold text-gray-900  ">Manager Phone Number <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(###-###-####)</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="tel" id="ManagerPhone" class="w-56  font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 10-->
            <div  class="col-span-2">
               <label for="ManagerEmail" class="block mb-2 text-sm font-bold text-gray-900  ">Manager Email <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(name@irs.gov)</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="email" id="ManagerEmail" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 11-->
            <div  class="col-span-2">
               <label for="MailStop" class="block mb-2 text-sm font-bold text-gray-900  ">Mail Stop/Room No. <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="MailStop" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 12-->
            <div  class="col-span-2">
               <label for="MailingAddress" class="block mb-2 text-sm font-bold text-gray-900  ">Mailing Address <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="MailingAddress" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 13-->
            <div  class="col-span-2">
               <label for="City" class="block mb-2 text-sm font-bold text-gray-900  ">City <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="City" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 14-->
            <div  class="col-span-2">
               <label for="State" class="block mb-2 text-sm font-bold text-gray-900  ">State <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="State" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 15-->
            <div  class="col-span-2">
               <label for="Zip" class="block mb-2 text-sm font-bold text-gray-900  ">Zip <span class="text-red-700 font-bold">*</span></label>
            </div>
            <div class="col-span-4">
               <input required  type="text" id="Zip" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
            </div>
            <!----Row 16-->
            <div  class="col-span-2">
               <label for="Comments" class="block mb-2 text-sm font-bold text-gray-900  ">Product Being Replaced</label>
            </div>
            <div class="col-span-4">
               <textarea id="Comments" rows="4" class="block font-bold p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" ></textarea>
            </div>
      </div>
</div>
<div style="display:none" class="w-full bg-white border border-gray-200 rounded-lg shadow mb-5">
  <h2  class="font-bold m-6 text-blue-900 text-lg">RAC Coordinator:</h2>
  <hr  class="h-px   bg-gray-200 border-0 dark:bg-gray-700 shadow">
      <div class="grid grid-cols-6 gap-2  items-center p-6 w-3/4 ">
         <!----Row 1-->
         <div  class="col-span-2">
            <label for="RAName" class="block mb-2 text-sm font-bold text-gray-900  ">RA Coord First and Last Name <span class="text-red-700 font-bold">*</span></label>
         </div>
         <div class="col-span-4">
            <input required  type="text" id="RAName" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
         </div>
         <!----Row 2-->
         <div  class="col-span-2">
            <label for="RANumber" class="block mb-2 text-sm font-bold text-gray-900  ">RA Request Number <span class="text-red-700 font-bold">*</span></label>
         </div>
         <div class="col-span-4">
            <input required  type="text" id="RANumber" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
         </div>
         <!----Row 3-->
         <div  class="col-span-2">
            <label for="RAEmail" class="block mb-2 text-sm font-bold text-gray-900  ">RA Coord Email <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(name@irs.gov)</span></label>
         </div>
         <div class="col-span-4">
            <input required  type="email" id="RAEmail" class="font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
         </div>
         <!----Row 4-->
         <div  class="col-span-2">
            <label for="RAPhone" class="block mb-2 text-sm font-bold text-gray-900  ">RA Coord Phone Numbers <span class="text-red-700 font-bold">*</span><br><span class="text-xs font-normal">(###-###-####)</span></label>
         </div>
         <div class="col-span-4">
            <input required  type="tel" id="RAPhone" class="w-56 font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "  >
         </div>
      </div>
</div>

<!----Buttons-->
<div class="my-5   ">
   <div class="grid grid-cols-1 items-center justify-center ">
       <button type="button" id="saveBTN" class=" w-1/6 justify-self-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-base px-5 py-3.5 text-center">Submit</button>
    </div>
</div>

<script defer>
   (async ()=>{
      ///ADD Lists
      const spList = await $SPList('Adaptive_Equipment_Refresh',"https://irsgov.sharepoint.com/sites/508site/_api/web/lists/getbytitle('Adaptive_Equipment_Refresh')?$expand=Items,Fields,RoleAssignments/Member,RoleDefinitionBindings,__metadata");


     ///ADD Fields
     const f1 = new $SPItem('Employee_SEID',spList.Name,'#SEID','Employee SEID');
     const f2 = new $SPItem('Employee_Organization',spList.Name,'#Organization','Organization');
     const f3 = new $SPItem('Work_Schedule',spList.Name,'#Schedule','Work Schedule');
     const f4 = new $SPItem('Disability_Category',spList.Name,'.disability-cbx','Disability Category');
     const f5 = new $SPItem('Employee_Name',spList.Name,'#EmployeeName','Employee Name');
     const f6 = new $SPItem('Employee_Email',spList.Name,'#EmployeeEmail','Employee Email');
     const f7 = new $SPItem('Employee_Phone',spList.Name,'#EmployeePhone','Employee Phone Number');
     const f8 = new $SPItem('Manager_Name',spList.Name,'#ManagerName','Manager Name');
     const f9 = new $SPItem('Manager_Phone',spList.Name,'#ManagerPhone','Manager Phone Number');
     const f10 = new $SPItem('Manager_Email',spList.Name,'#ManagerEmail','Manager Email');
     const f11 = new $SPItem('Mail_Stop',spList.Name,'#MailStop','Mail Stop/Room No.');
     const f12 = new $SPItem('Address',spList.Name,'#MailingAddress','Mailing Address');
     const f13 = new $SPItem('City',spList.Name,'#City','City');
     const f14 = new $SPItem('State',spList.Name,'#State','State');
     const f15 = new $SPItem('Zip',spList.Name,'#Zip','Zip');
     const f16 = new $SPItem('General_Comments',spList.Name,'#Comments','General Comments');
   //  const f17 = new $SPItem('RA_Coord_FirstLastName',spList.Name,'#RAName','RA Coord First and Last Name');
     //const f18 = new $SPItem('RA_Request_Number',spList.Name,'#RANumber','RA Request Number');
     //const f19 = new $SPItem('RA_Coord_Email',spList.Name,'#RAEmail','RA Coord Email');
     //const f20 = new $SPItem('RA_Coord_Phone',spList.Name,'#RAPhone','RA Coord Phone Numbers');


       var spFormFields = [f1,
                           f2,
                           f3,
                           f4,
                           f5,
                           f6,
                           f7,
                           f8,
                           f9,
                           f10,
                           f11,
                           f12,
                           f13,
                           f14,
                           f15,
                           f16
                          // f17,
                          // f18,
                        //   f19,
                          // f20
                            ];



 /////Configure Error Messages
 const formError = new $ErrorInit('#formValidation','#error-List','#spValidation-List')
  /////Configure Success Messages
  const formSuccess= new $SuccessInit('#successAlerts')





   ///save to List
   const saveForm = async ()=>{
      ///clear success messages
           formSuccess.clear();
      ///clear error messages
          formError.clear(true);
       ///validate Form Fields
        var validationResults = spValidate(spFormFields);
        var isValid =  formError.message(validationResults,true);


        ///save form if valid
         if(isValid){
               ///prepare save pairs
                  var itemValues = [];
                     spFormFields.forEach((field,fieldIndex)=>{
                        var valuePair = field.prep();
                        itemValues.push(valuePair)
                     });

                     ///add title
                     itemValues.push({'Title':"Request"})
                     ///save new Item
                     const saveFetch = await spList.newItem(itemValues);
                      if(!saveFetch){
                         ///Error
                         formError.message('<span class="font-semibold"><b>Error!</b> There was error saving your form. Please contact a SharePoint Administrator at <a href="mailto:IRAP@irs.gov">*IRAP</a></span>.');
                      }else{
                         ///Success
                           ///Generate SP ALert
                           var userData = await getCurrentUserInfo();
                                       var alertParams = itemValues;
                                       alertParams.push({"CurrentUser":userData.Email});
                                       await newIRAP_Alert(11,9,alertParams);
                                       //   console.log(alertParams);
                         const saveBTN = $('#saveBTN');
                         saveBTN.classList.add('hidden');
                         formSuccess.message('<span class="font-semibold"><b>Success!</b> Your form was submitted successfully. You can now close this form or return to the <a href="https://irsgov.sharepoint.com/sites/508site">IRAP</a> site.');
                      }

         }

   }

    $('#saveBTN').addEventListener("click",saveForm)

   })()
</script>
</asp:Content>
