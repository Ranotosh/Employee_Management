import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, Form, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../list-employee/list-employee.service';
import { IEmployee } from '../list-employee/IEmplolyee';
import { ISkill } from '../list-employee/ISkill';
@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  namePattern = "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$";
  emailPattern = "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
  pagetitle: string;
  employeeForm: FormGroup;
  employee;
  validationmessage = {
    'fullname': {
      'required': 'Full Name is required',
      'pattern': 'Give valid Full Name',
      'minlength': 'Name must be at least 4 characters long.'
    },
    'email': { 'required': 'Email is required', 'pattern': 'Give valid Email' },
    'confirmemail': { 'required': 'Email is required', 'pattern': 'Give valid Email' },
    'emailgroup': { 'emailmismatch': 'Email and Confirm Email do not match' },
    'phone': { 'required': 'Phone is required' },
    'skillname': { 'required': 'Skill Name is required' },
    'expinyears': { 'required': 'Experience is required' },
    'proficiency': { 'required': 'Proficiency is required' }

  };
  formError = {
    'fullname': '',
    'email': '',
    'confirmemail': '',
    'emailgroup': '',
    'phone': '',
    'skillname': '',
    'expinyears': '',
    'proficiency': ''

  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
    this.mapFromValuesTOeMPmodel();
    if (this.employee.id) {
      this._empService.updateEmployee(this.employee).subscribe(() => this._router.navigateByUrl("employee/list"))
    }
    else {
      this._empService.addEmployee(this.employee).subscribe(() => this._router.navigateByUrl("employee/list"))
    }

  }

  mapFromValuesTOeMPmodel() {

    this.employee.fullname = this.employeeForm.value.fullname;
    this.employee.email = this.employeeForm.value.emailgroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.contactpref = this.employeeForm.value.contactpreference;
    this.employee.skills = this.employeeForm.value.skills;


  }

  matchemail(group: AbstractControl): { [key: string]: any } | null {
    const emailcontrol = group.get('email');
    const confirmemailcontrol = group.get('confirmemail');
    if (emailcontrol.value === confirmemailcontrol.value || confirmemailcontrol.pristine) {
      return null;
    }
    else {
      return { 'emailmismatch': true }
    }

  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formError[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationmessage[key];

        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formError[key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);

      }
      if (abstractControl instanceof FormArray) {
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);

          }
        }

      }

    })
  }
  onloaddata(): void {

    this.logValidationErrors(this.employeeForm);
    console.log(this.formError);
  }
  onContactPrefChange(value: string) {
    const phoneControl = this.employeeForm.get('phone');
    // const emailControl=this.employeeForm.get('email');
    if (value === 'phone') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();


  }

  addskillsformgroup(): FormGroup {

    return this.fb.group({

      skillname: ['', [Validators.required]],
      expinyears: ['', [Validators.required]],
      proficiency: ['', Validators.required]
    })
  }

  addskillbutton() {
    (<FormArray>this.employeeForm.get('skills')).push(this.addskillsformgroup());
  }

  removeskillbutton(skillGroupIndex: number): void {
    // const formSkillsArray=(<FormArray>this.employeeForm.get('skills'))
    // formSkillsArray.removeAt(skillGroupIndex);
    // formSkillsArray.markAsDirty();
    // formSkillsArray.markAsTouched();
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);
  }


  getEmployeeId(id: number) {
    this._empService.getEmplyeeId(id)
      .subscribe((employee: IEmployee) => {
        this.editemployee(employee),
        this.employee = employee; console.log(this.employee)
      })
  }

  editemployee(employee: IEmployee) {

    this.employeeForm.patchValue({
      fullname: employee.fullname,
      contactpreference: employee.contactpref,
      emailgroup: {
        email: employee.email,
        confirmemail: employee.email
      },

      phone: employee.phone
    })
    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills));
  }

  setExistingSkills(skillset: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillset.forEach(sk => {
      formArray.push(
        this.fb.group({
          skillname: sk.skillname,
          expinyears: sk.expinyears,
          proficiency: sk.proficiency,
        }));
    })
    return formArray;
  }

  constructor(private fb: FormBuilder, private _routerId: ActivatedRoute, private _empService: EmployeeService, private _router: Router) { }

  ngOnInit() {



    this.employeeForm = this.fb.group({

      fullname: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.namePattern)]],
      contactpreference: ['email'],
      emailgroup: this.fb.group({
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        confirmemail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],

      }, { validator: this.matchemail }),

      phone: [''],
      skills: this.fb.array([
        this.addskillsformgroup()

      ])
    });
    this.employeeForm.valueChanges.subscribe((data) => { this.logValidationErrors(this.employeeForm) });
    this.employeeForm.get('contactpreference').valueChanges.subscribe((data: string) => {
      this.onContactPrefChange(data);
    })

    this._routerId.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.pagetitle = "Edit Employee";
        this.getEmployeeId(empId);

      }
      else {
        this.pagetitle = "Create Employee"
        this.employee = {
          id: null,
          fullname: '',
          email: '',
          confirmemail: '',
          phone: null,
          skills: [],

        }
      }
    })



  }

}
