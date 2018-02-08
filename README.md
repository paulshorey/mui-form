# 
# GitBook
Please click below to read this with better code formatting, with navigation:  
**https://paulshorey.gitbooks.io/mui-form/content/**  






# 
# 
# Mui-Form

is

* an NPM Package
* for any ReactJS app
* a library of components for ReactJS
* so, use &lt;MuiForm /&gt; instead of &lt;form /&gt;, and &lt;MuiSelect /&gt; instead of &lt;select /&gt;
* uses Material-UI style guide for each of its components
* validates your elements
* accepts custom validations, ofcourse
* manages your React component's local state
* so, the "submit", "reset", "loading", "validation failed" buttons and messages will show up automatically based on your form's input elements
* the reset button resets your form automatically, to the previously saved state
* the submit button submits the form
* you set the submit handler function, and onSubmit, the library calls it with a promise - the promise will fail if the form is invalid, and proceed if validation is ok - then you can do your custom action and submit the data to your backend
* also it manages the status of your form: "invalid", "error", "submitting", "submitAttempted", etc

.

Everything is customizable,

* and if it's not, then it will be. ;\)
* This project is still in active development, and could use your help, if you'd like to contribute code or testing!






# 
# 
# Installation: 
## It's on NPM and Yarn!

**Simply:**

```
npm install mui-form --save
```

**Then import it whenever you need it:**

```
import { MuiForm, MuiInput } from 'mui-form';
```





# 
# 
# Basic Usage: 
## Four steps to use it in any React Component:

First, of course, `npm install --save mui-form`,
Then in your javascript file import it. If you can use ES6, then `import { MuiForm } from 'mui-form'`

#### 1\) Define a state

> ```
> class PageComponent extends React.Component {
>   state = {};
> ```
>
> It must be defined as an object, in the constructor method of your component. It can be an empty object, and you can fill in the properties later. More details on next page - [normal usage](https://paulshorey.gitbooks.io/mui-form/content/normal-usage.html).

#### 2\) Define an onSubmit handler function and add the form component

> ```
> render(
>   var handleSubmit = (promise)=>{
>     // do things
>    }
>   <MuiForm stateScope={this} onSubmit={handleSubmit}>
>     {stuff}
>   </MuiForm>
> )
> ```
>
> [**&lt;MuiForm /&gt;**](/asdf) will become &lt;form /&gt;
> Requires - pass it the two attributes: [stateScope](https://paulshorey.gitbooks.io/mui-form/content/state-management.html) and onSubmit
> Optional - pass to it anything else you would pass to &lt;form /&gt;, including a className

#### 3\) Add some input components \(or toggle or select or textbox\)

> ```
> <fieldset>
>   <label>
>     Customer info:
>   </label>
>   <MuiInput
>     stateScope={this}
>     name="customer_name"
>     type="text"
>     validations={[validations.required]}
>   />
>   <MuiInput
>     stateScope={this}
>     name="customer_email"
>     type="text"
>     validations={[validations.required, validations.email ]}
>   />
> </fieldset>
> ```
>

> [&lt;MuiForm /&gt;](https://paulshorey.gitbooks.io/mui-form/content/muiform.html) will become &lt;input /&gt;, [&lt;MuiSelect /&gt;](https://paulshorey.gitbooks.io/mui-form/content/muiinput.html) will become a &lt;select /&gt;, etc.
> Requires - pass it the two attributes: stateScope and onSubmit
> Optional - pass to it anything else you would pass to &lt;input /&gt;, including a className or onFocus
> The `name` will be the property/key in the form data store. So, this example will generate the form data:
> `{ customer_name: 'user typed name', customer_email: 'user@gmail.com' }`

#### 4\) Form submission

> ```
> const handleSubmit = (valid)=>{
>
>   valid.then(event => {
>
>     // form is VALID
>     console.log('Submit form data: ',this.state.muiFormValues);
>   })
>   .catch(err => {
>
>   // form is NOT valid
>   console.error('Error form: ' + err);
>   });
> };
> ```
>
> Your handler function will receive a promise. It will resolve if form is valid.
> If form is not valid, the promise will be rejected. Usually you don't need to worry about a custom error message because the form library will automatically show an error message and scroll to call attention to incorrect fields, and will disable the submit button until changes are made.

###

### Full example with these steps as comment tags:

```js
class PageComponent extends React.Component {

/*
Step 1:
* Define a state!
* At least make it an empty object. You can fill in the properties later from a REST request.
*/
state = {};

render() {
var handleSubmit = (promise)=>{
/*
Step 4:
Do something after form submit attempted.
promise will be rejected if form is invalid
promise will resolve if all inputs are OK
*/
};

return (
<div>

{/*
Step 3:
* Add your form.
* <MuiForm /> will become <form>
* IMPORTANT - pass it the two attributes: stateScope and onSubmit
* OPTIONAL - pass to it anything else you would pass to <form />, including a className
*/}
<MuiForm stateScope={this} onSubmit={handleSubmit}>

<fieldset>
<label>
Some field:
</label>

{/*
Step 4:
* Add some input components (or toggle or select or textbox)
* Give it a name and validations
* Don't forget to pass it the stateScope prop
*/}
<MuiInput
stateScope={this}
name="some_required_text_field"
type="text"
validations={[validations.required]}
/>
</fieldset>

</MuiForm>
</div>
);
}
}
```





# 
# 
# Normal Usage:
## Four steps to using it in the real world:

#### 1\) Define a state

> ```
> class PageComponent extends React.Component {
>   state: {
>     muiFormValues: {
>     customer_name: 'Paul Shorey',
>     customer_email: 'ps@artspaces.net'
>   },
>   muiFormButtons: {
>     submit: 'Confirm changes',
>     reset: 'Abandon changes',
>   },
> }
> ```
>
> By requirement, this.state only has to equal an object. It can be empty. Then, when any of the form inputs are changed, mui-form will automatically create properties for them in `this.state.muiFormValues`. The property name \(key\) of this field will be equal to your input element's `name` . So, an input with name="customer\`email" will be stored in `this.state.muiFormValues.customer_email`
>
> You can also pre-fill the form values. You can also customize the values of the buttons, such as the submit or reset. Or you can add a custom "invalid" error message text. The benefit of pre-defining each form input key in this state.muiFormValues in the component's constructor is:
> 1\) You maybe get these key/values pairs from the backend, in which case, it will look as the example above.
> 2\) If you're getting these fields from an AJAX request after the component has loaded, pre-setting the form values is not necessary. However, it may help later to know which properties are relevant.

#### 2\) Define an onSubmit handler function and add the form component

> ```
> componentWillMount(){
>
>   // REST API get and pre-fill form values:
>   fetch('http://someAPI.com/v1/customerData', {
>     method: 'post',
>     headers: {'Content-Type':'application/json'},
>     body: {
>       "id": this.props.customer.id
>     }
>   }).then((data)=>{
>
>   // got the new form data - lets update our form with it:
>   this.setState({muiFormValues: Object.assign({...this.state.muiFormValues}, {...data})});
>
>   }).catch(function(err){
>     console.log('Error fetch:-S', err);
>   });
>
> }
>
> render(
>   var handleSubmit = (promise)=>{
>     // get form data
>     promise.then(function(formData) {
>       // use formData
>     });
>   }
>   <MuiForm stateScope={this} onSubmit={handleSubmit}>
>     {stuff}
>   </MuiForm>
> )
> ```
>
> This form integration is actually unchanged since the '[Basic Usage](/asf)' example. However, notice the extra REST API call and the `formData` in this handleSubmit function.
>
> Here, we update form data with data from the server - and do it after the form has already loaded. Luckily, this component renders so fast, and our form data usually loads so fast, that we don't have to worry about annoying the user. But, in case we might have to wait longer than 200ms, lets add a custom state variable that enables and disables a loading animation.

#### 3\) Add any number of controlled form field \(input or toggle or select or textbox\)

> ```
> <fieldset>
>   <label>
>     Customer info:
>   </label>
>   <MuiInput
>     stateScope={this}
>     name="customer_name"
>     type="text"
>     validations={[validations.required]}
>   />
>   <MuiInput
>     stateScope={this}
>     name="customer_email"
>     type="text"
>     validations={[validations.required, validations.email ]}
>   />
> </fieldset>
> ```

#### 4\) Handle the form submission

> ```
> const handleSubmit = valid => {
>
>   valid.then(event => {
>
>   // form is VALID
>     console.log('Submit form data: ',this.state.muiFormValues);
>   })
>   .catch(err => {
>
>   // form is NOT valid
>     console.error('Error form: ' + err);
>   });
> };
> ```

###

### Full example with these steps as comment tags:

```js
class PageComponent extends React.Component {

  /*
  Step 1:
  * Define a state!
  * At least make it an empty object. You can fill in the properties later from a REST request.
  */
  state = {};

  render() {
    var handleSubmit = (promise)=>{
      /*
      Step 4:
      Do something after form submit attempted.
      promise will be rejected if form is invalid
      promise will resolve if all inputs are OK
      */
    };

    return (
      <div>

        {/*
        Step 3:
        * Add your form.
        * <MuiForm /> will become <form>
        * IMPORTANT - pass it the two attributes: stateScope and onSubmit
        * OPTIONAL - pass to it anything else you would pass to <form />, including a className
        */}
        <MuiForm stateScope={this} onSubmit={handleSubmit}>

          <fieldset>
            <label>
              Some field:
            </label>

            {/*
            Step 4:
            * Add any number of input components (or toggle or select or textbox)
            * Give it a name and validations
            * Don't forget to pass it the stateScope prop
            */}
            <MuiInput
              stateScope={this}
              name="some_required_text_field"
              type="text"
              validations={[validations.required]}
            />
          </fieldset>

        </MuiForm>
      </div>
    );
  }
}
```






# 
# 
# State Management:
## MuiForm works with your Component's local state:

Scroll below to learn what `muiForm` properties are put inside your component's `this.state`...

#### What does this mean?

Any React Component has a local-state store, `this.state`. It is not accessible by other components. Here, you can keep variables, data, metadata, and status information relevant to only the current component. MuiForm component keeps its form values and status information NOT in its own state, but in YOUR component's state.

```
// from your component, you can access the form data:
console.log( this.state.muiFormValues );

// anytime you can also access check if the form is valid:
console.log( this.state.muiFormInvalid );
```

As you can see, now you can easily access your form's data, without awkwardly selecting it by refs or other selectors. There are other useful variables as well. Everything is name-spaced with `this.state.muiForm...` . Also, input fields and buttons can have access to the parent form, and modify its state.

#### How is this accomplished?

Installation:
1\) You can only have one MuiForm per React Component. If you wish to have multiple forms on the page, separate them so each form has its own parent component.
2\) When you include `<MuiForm />` or `<MuiInput />`, you must pass to them the current component, because in React, a child component can not access its parent component. You're supposed to pass down whatever is necessary from parent to child. So, we do it like: `<MuiForm stateScope={this} />` or `<MuiInput stateScope={this} />`

####

#### Why is this not usually done by plugins?

As mentioned, in React, a child component can not access its parent component. You're supposed to pass down whatever is necessary from parent to child. &lt;MuiForm /&gt; requires `this.state` and `this.setState` from the parent.

Why don't we do `<MuiForm state={this.state} setState={this.setState} />` ?

Because under the hood, there is more that is shared between the form and its input fields and buttons. There is also stuff outside the state, which the state does not immediately rely on: `this.muiFormElementsToValidate`, `this.muiFormValidate`, and `this.muiFormReset`.
**this.muiFormElementsToValidate** -- as it is called, this is an array of form elements, that have the `validate` prop passed to them. BTW, to validate an input, set the validate prop to be an array of validation functions, in order that they should be performed. Stock validation functions are included in this form library, and can be imported as `import { validations } from 'mui-form'`.
**this.muiFormValidate** -- a function which is called by each form field, to validate itself onChange. It is also called by the form upon submission, on behalf of each field element registered in `this.muiFormElementsToValidate`.
**this.muiFormReset** -- a function which can be called by the "reset" button, included by default in the form \(you can disable it\). You can also call this function directly from the component, to get all field inputs and the form state back to original values.
**this.muiFormSet **-- a function which can be called by the "reset" button, included by default in the form \(you can disable it\). You can also call this function directly from the component, to get all field inputs and the form state back to original values. -- so, this.muiFormReset resets the form to its original values. What is meant by "original values"? This function sets the original values. It is called by the form when it is initially loaded. But, _**as the developer, you are responsible for calling this function anytime you edit the form programmatically, or after the user successfully submits the form**_. Otherwise, the form will use "original" values, meaning `this.state.muiFormValues` you set in the `constructor` or `componentWillMount` , which are optional.

So, why is this not usually done by other plugins? Because it requires a lot of trust between the developer, and the plugin's code. You are allowing full control of your component to `mui-form`. But, this form library does so much good, and it is up to you whether you want to accept this downside. Perhaps, use the form, but do not install it in your package.json file as @latest. Instead, pick the current version number, maybe scan the source code, and have your project install that version number. Anytime you want to upgrade the version, scan mui-form's repository for changes again, to make sure some open-source contributor did not include some malicious code.

#### So that was the 'Why'. Here is 'What' MuiForm puts into your component's local state:

You have access to all this. Child inputs and buttons also access it. All variables are name-spaced with "muiForm".

# this.state:

#### this.state.muiFormValues

#### this.state.muiFormValuesOriginal

#### this.state.muiFormButtons

#### this.state.muiFormSubmitAttempted

#### this.state.muiFormSubmitting

#### this.state.muiFormChanged

#### this.state.muiFormConnectionFailed

#### this.state.muiFormInvalid







#
#  
# Material UI

This project uses Google's "Material UI" design specifications, which dictate how elements in a mobile-friendly app should be designed. They include specifications for colors, shapes, padding, drop shadows, and placement of elements on the responsive page.

This project takes these guidelines relatively loosely. But stays true to them especially for the form elements. The text input, buttons, select element, and checkbox are styled properly. The checkbox is turned into the Material UI's "toggle" switch. So, there is no checkbox. It is [&lt;MuiToggle /&gt;](https://paulshorey.gitbooks.io/mui-form/content/muitoggle.html).

As for the actual styles, this project uses [Styled-Components](https://www.styled-components.com/) library. It works just like SASS (SCSS), but is automatically name-spaced to make conflicts impossible. It also places SCSS syntax into Javascript. So, you can use any Javascript variables or logic inside the stylesheet.  
# 






# 
# &lt;MuiForm /&gt; Component

```
import { MuiForm } from 'mui-form';
````  
coming soon...  







# 
# &lt;MuiInput /&gt; Component

```
import { MuiInput } from 'mui-form';
````  
coming soon...  







# 
# &lt;MuiSelect /&gt; Component

```
import { MuiSelect } from 'mui-form';
````  
coming soon...  







# 
# &lt;MuiToggle /&gt; Component

```
import { MuiToggle } from 'mui-form';
````  
coming soon...  







# 
# &lt;MuiButton /&gt; Component

```
import { MuiButton } from 'mui-form';
````  
coming soon...  






# 
# Stock Validations

```
import { validations } from 'mui-form';
```  
coming soon...  







# 
#
# Advanced Usage:
## Documentation is not finished

Coming soon







# 
# 
# Read more at GitBook.com:
**https://paulshorey.gitbooks.io/mui-form/content/**  
