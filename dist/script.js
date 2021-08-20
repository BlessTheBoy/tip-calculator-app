"use strict";var billWrapper=document.querySelector("#bill-wrapper"),bill=document.querySelector("#bill"),peopleWrapper=document.querySelector("#people-wrapper"),people=document.querySelector("#people"),percentWrapper=document.querySelector("#percent-wrapper"),radioButtons=document.getElementsByName("percentage"),customRadio=document.querySelector("#custom"),customInput=document.querySelector("#customValue"),tipDisplay=document.querySelector("#tip"),totalDisplay=document.querySelector("#total"),reset=document.querySelector("#reset");reset.onclick=resetView;for(var inputs=document.querySelectorAll("input"),index=0;index<inputs.length;index++)inputs[index].onchange=calculateTip;function getBillValue(){return bill.value}function getTipPercentage(){for(var e=0;e<radioButtons.length;e++)if(radioButtons[e].checked)return radioButtons[e].value;return null}function getNumberOfPeople(){return people.value}function showError(e,r){e.classList.add("error"),e.querySelector(".label-wrap .error-message").textContent=r}function removeError(){for(var e=0;e<arguments.length;e++)arguments[e].classList.remove("error")}function checkAndConvert(e,r){if(""==e||" "==e)showError(r,"enter number");else if(isNaN(Number(e)))showError(r,"enter valid number");else if(0==Number(e))showError(r,"Can't be zero");else{if(!(Number(e)<0))return Number(e);showError(r,"Can't be negative")}return null}function resetView(e){e.preventDefault(),bill.value="";for(var r=0;r<radioButtons.length;r++)radioButtons[r].checked=!1;people.value="",removeError(billWrapper,percentWrapper,peopleWrapper),tipDisplay.innerHTML="$0.00",totalDisplay.innerHTML="$0.00",reset.disabled=!0}function calculateTip(){reset.disabled=!1;var e=getBillValue(),r=getTipPercentage(),t=getNumberOfPeople();if(removeError(billWrapper,percentWrapper,peopleWrapper),e=checkAndConvert(e,billWrapper))if(null!=r){if("custom"==r){if(r=checkAndConvert(customInput.value,percentWrapper),console.log("tipPercentage",r),!r)return}else r=Number(r);if(t=checkAndConvert(t,peopleWrapper)){console.log(r/100);var o=e*(r/100);console.log("tip",o);var n=(e+o)/t,l=o/t;n=Math.round(100*(n+Number.EPSILON))/100,l=Math.round(100*(l+Number.EPSILON))/100,tipDisplay.innerHTML="$"+l,totalDisplay.innerHTML="$"+n}}else showError(percentWrapper,"select tip percentage")}customRadio.addEventListener("change",(function(){this.checked&&customInput.focus()}));
//# sourceMappingURL=script.js.map