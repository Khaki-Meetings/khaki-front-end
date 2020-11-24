import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['./settings-employees.component.scss']
})
export class SettingsEmployeesComponent implements OnInit {

  employees = [
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Ralph Anderson',
      subject: 'IT',
      department: 'Development'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Kyle Derwin',
      subject: 'Customer support',
      department: 'Agent'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Lucas Bradley',
      subject: 'Sales',
      department: 'Representative'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Mindy Orwell',
      subject: 'IT',
      department: 'Development'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Charles Radcliffe',
      subject: 'IT',
      department: 'Designer'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Dave Schloff',
      subject: 'Human resources',
      department: 'Assistant Director'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Tina Young',
      subject: 'Finace',
      department: 'Accountant'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Ralph Anderson',
      subject: 'IT',
      department: 'Development'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Ralph Anderson',
      subject: 'IT',
      department: 'Development'
    },
    {
      avatar: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
      name: 'Ralph Anderson',
      subject: 'IT',
      department: 'Development'
    }
  ]
  pos = 0
  maxshow = 6

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getEmployees() {
    return this.employees.slice(this.pos, this.pos + this.maxshow);
  }

  editEmployee(employee) {
    this.router.navigateByUrl("settings/employee");
  }

  addEmployee() {

  }

  moveUp() { 
    let newpos = this.pos - 1;    
    if(newpos>=0) {
      this.pos = newpos;
    }
  }

  moveDown() {   
    let newpos = this.pos + 1;    
    if(newpos + this.maxshow <= this.employees.length) {
      this.pos = newpos;
    }
  }

  isLast() {    
    return this.pos + this.maxshow >= this.employees.length;
  }

  isFirst() {
    return this.pos == 0;
  }
}
