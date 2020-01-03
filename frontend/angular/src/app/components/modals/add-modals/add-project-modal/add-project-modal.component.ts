import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsComponent} from "../../../pages/projects/projects.component";
import {ProjectService} from "../../../../services/projects/project.service";
import {Project} from "../../../../services/projects/project.model";
import {UserModel} from "../../../../services/auth/user.model.temp";
import {UserService} from "../../../../services/auth/user.service";
import {debounceTime, finalize} from "rxjs/operators";

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent implements OnInit {

  projectForm: FormGroup;

  isLoadingMembers: boolean = false;

  possibleLeaders: UserModel[];
  possibleMembers: UserModel[][];


  constructor(public fb: FormBuilder, private matDialogRef: MatDialogRef<ProjectsComponent>,
              @Inject(MAT_DIALOG_DATA) public data, private project_service: ProjectService,
              private userService: UserService) {
  }

  onSubmitProject() {
    let projectName: string = this.name.value;
    let projectDescription: string = this.description.value;
    let projectLeadID: number = this.possibleLeaders[0].id;
    let memberArray: UserModel[][] = this.possibleMembers;
    let memberIDArray: number[] = [];
    for (let i = 0; i < memberArray.length; i++) {
      memberIDArray.push(memberArray[i][0].id);
    }

    let projectNew: Project = new Project();
    projectNew.name = projectName;
    projectNew.description = projectDescription;
    projectNew.lead = projectLeadID;
    projectNew.member_ids = memberIDArray;
    this.createPost(projectNew);
  }

  ngOnInit() {
    this.projectForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      lead: new FormControl('', [Validators.required]),
      members: this.fb.array([], [])
    });

    this.projectForm.get('lead').valueChanges
      .pipe(
        debounceTime(500),
      )
      .subscribe(
        result => {
          this.getSearchedUser(result);
        },
      );

    this.projectForm.get('members').valueChanges
      .pipe(
        finalize(() => {
          debounceTime(500);
        }),
      )
      .subscribe(
        memberArray => {
          this.isLoadingMembers = true;
          let tempInputNames: string[] = [];
          for (let memberName of memberArray) {
            tempInputNames.push(memberName.name)
          }
          this.getMultipleSearchedUser(tempInputNames);
        }
      )
  }

  getSearchedUser = (search: string) => {
    this.userService.getSearched(search).subscribe(
      data => {
        this.possibleLeaders = data;
      },
      error => {
        console.log(error);
      })
  };

  getMultipleSearchedUser = (search: string[]) => {
    this.userService.getMultipleSearched(search).subscribe(
      data => {
        this.possibleMembers = data;
        this.isLoadingMembers = false;
      },
      error => {
        console.log(error);
        this.isLoadingMembers = false;
      }
    )
  };

  createPost = (project: Project) => {
    this.project_service.post(project).subscribe(
      (val) => {
        console.log("Post call successfully value returned in body", val);
      },
      response => {
        console.log("Post call in error", response);
      },
      () => {
        console.log("The Post observable is now completed.");
      }
    )
  };

  get name() {
    return this.projectForm.get('name');
  }

  get description() {
    return this.projectForm.get('description');
  }

  get lead() {
    return this.projectForm.get('lead');
  }

  get memberForms() {
    return this.projectForm.get('members') as FormArray
  }

  addMember() {
    let member = this.fb.group({
      name: new FormControl('', [Validators.required])
    });
    this.memberForms.push(member);
  }

  deleteMember(i: number) {
    this.memberForms.removeAt(i)
  }

  close() {
    this.matDialogRef.close();
  }

}
