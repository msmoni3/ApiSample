import { Component, VERSION ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  constructor( private formBuilder: FormBuilder , private _http:HttpClient ) { }
  registerForm: FormGroup;
    submitted = false;

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          typeVal: ['', Validators.required],
          access_key: ['', [Validators.required]],
          secret_key: ['', Validators.required]
      },);
  }

  get f() { 
    return this.registerForm.controls;    //// used while validating the forms
  }

  url=`http://localhost:8000/sampleapi`;    // need to start the npm server with 8000 port 

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }  

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this._http.post(this.url,(this.registerForm.value)).subscribe(res=>console.log(res))
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
