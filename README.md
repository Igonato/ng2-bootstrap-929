#  ng2-bootstrap Bug Reproduction 

Issue: https://github.com/valor-software/ng2-bootstrap/issues/929

<!-- MarkdownTOC -->

- [Steps](#steps)
  - [New angular cli project](#new-angular-cli-project)
  - [ng2-bootstrap installation](#ng2-bootstrap-installation)
  - [AlertModule works](#alertmodule-works)
  - [DatePicker Module works in browser, but fails tests](#datepicker-module-works-in-browser-but-fails-tests)
- [Full error](#full-error)

<!-- /MarkdownTOC -->


## Steps

### New angular cli project

Create new project using Angular CLI master branch, since npm @latest 
doesn't support RC.6 yet. *7150cf9cac6b0bb7daea8a709c473b37498906af*

```bash
>ng -v
angular-cli: local (v1.0.0-beta.11-webpack.8, branch: master)
node: 6.5.0
os: win32 x64

>ng new ng2-bootstrap-929
...

>cd ng2-bootstrap-929

>npm link angular-cli
...

# ng serve works
# ng test works
```

### ng2-bootstrap installation

```bash
>npm install ng2-bootstrap --save
... # few UNMET PEER DEPENDENCY warnings 
```

### AlertModule works

```js
/* src/app/app.module.ts */
...
import { AlertModule } from 'ng2-bootstrap';

...
@NgModule({
  imports: [
    ...
    AlertModule,
  ],
  ...
})
export class AppModule {}
```

```html
<!-- src/app/app.component.html -->
<alert type="info">Hello from ng2-bootstrap</alert>


<!-- src/index.html -->
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
```

`ng serve` works, expected output in http://localhost:4200/
`ng test` works after adding the import in the test module:

```js
/* src/app/app.component.spec.ts */
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('App: Ng2Bootstrap929', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
    });
  });

  ...
```

### DatePicker Module works in browser, but fails tests

```js
/* src/app/app.module.ts */
...
import { AlertModule, DatepickerModule } from 'ng2-bootstrap';

...
@NgModule({
  imports: [
    ...
    AlertModule,
    DatepickerModule
  ],
  ...
})
export class AppModule {}
```

Already `ng test` will fail with the `No provider for NgModel` error but 
let's add it in the template to see if it works:

```html
<!-- src/app/app.component.html -->
<div style="display:inline-block; min-height:290px;">
  <datepicker [(ngModel)]="date" showWeeks="true"></datepicker>
</div>
```

```js
/* src/app/app.component.ts */

...
export class AppComponent {
  title = 'app works!';
  date = new Date();
}

```

Go to http://localhost:4200/ - works fine!

## Full error 

```
>ng test
12 09 2016 20:35:00.541:WARN [karma]: No captured browser, open http://localhost:9876/
12 09 2016 20:35:00.547:INFO [karma]: Karma v1.2.0 server started at http://localhost:9876/
12 09 2016 20:35:00.548:INFO [launcher]: Launching browser Chrome with unlimited concurrency
12 09 2016 20:35:00.703:INFO [launcher]: Starting browser Chrome
12 09 2016 20:35:02.243:INFO [Chrome 53.0.2785 (Windows 10 0.0.0)]: Connected on socket /#iCWSJsVtd9on-TitAAAA with id 44918316
Chrome 53.0.2785 (Windows 10 0.0.0) App: Ng2Bootstrap929 should create the app FAILED
        No provider for NgModel ("[ERROR ->]<datepicker ngModel></datepicker>"): DatePickerComponent_Host@0:0
        Error: Template parse errors:
            at TemplateParser.parse (http://localhost:9876/_karma_webpack_/0.bundle.js:6243:19)
            at RuntimeCompiler._compileTemplate (http://localhost:9876/_karma_webpack_/0.bundle.js:13822:51)
            at http://localhost:9876/_karma_webpack_/0.bundle.js:13683:59
            at Set.forEach (native)
            at compile (http://localhost:9876/_karma_webpack_/0.bundle.js:13683:23)
            at RuntimeCompiler._compileModuleAndAllComponents (http://localhost:9876/_karma_webpack_/0.bundle.js:13686:52)
            at RuntimeCompiler.compileModuleAndAllComponentsSync (http://localhost:9876/_karma_webpack_/0.bundle.js:13652:21)
            at TestingCompilerImpl.compileModuleAndAllComponentsSync (http://localhost:9876/_karma_webpack_/0.bundle.js:17452:35)
            at TestBed._initIfNeeded (webpack:///C:/Users/Igonato/Projects/nglab/ng2-bootstrap-929/~/@angular/core/bundles/core-testing.umd.js:1059:0 <- src/test.ts:17854:40)
            at TestBed.createComponent (webpack:///C:/Users/Igonato/Projects/nglab/ng2-bootstrap-929/~/@angular/core/bundles/core-testing.umd.js:1141:0 <- src/test.ts:17936:18)
Chrome 53.0.2785 (Windows 10 0.0.0): Executed 1 of 3 (1 FAILED) (0 secs / 0.216 secs)
...
Chrome 53.0.2785 (Windows 10 0.0.0): Executed 3 of 3 (3 FAILED) ERROR (0.56 secs / 0.411 secs)
```
