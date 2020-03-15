import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe-service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  constructor(private aroute:ActivatedRoute, 
    private recipeService:RecipeService,
    private route:Router) { }
  id:number;
  edit:boolean=false;
  editRecipeForm:FormGroup;
  recipe:Recipe
  ngOnInit() {
    this.recipeService.recipeChanged.subscribe(
      (recipe:Recipe[])=>{
        this.recipe=recipe[this.id];
        //console.log(this.recipe)
        this.initForm()
      }
    )
    this.aroute.params.subscribe((params:Params)=>{
      this.id=params['id'];
      this.edit=params['id']!=null
      this.initForm()
  })
}
  private initForm(){
    let rNmae='';
    let rDis='';
    let rImgPath='';
    let rIng=new FormArray([])
    if(this.edit){
      //console.log("id:"+this.id)
      this.recipe=this.recipeService.getRecipeByID(this.id)
      //console.log("recipe:"+this.recipe)
      rNmae=this.recipe.name;
      rDis=this.recipe.description;
      rImgPath=this.recipe.imagePath;

      if(this.recipe.ingredient){
        for(let ing of this.recipe.ingredient){
          rIng.push(new FormGroup({
            name:new FormControl(ing.name,Validators.required),
            amount:new FormControl(ing.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }

    }
    this.editRecipeForm=new FormGroup({
      name:new FormControl(rNmae,Validators.required),
      description:new FormControl(rDis,Validators.required),
      imgPath:new FormControl(rImgPath,Validators.required),
      ingredients:rIng
    })
    //console.log(this.editRecipeForm)
  }

  onSubmit(){
    // const newRecipe=new Recipe(this.editRecipeForm.value.name,
    //   this.editRecipeForm.value.description,
    //   this.editRecipeForm.value.imagePath,
    //   this.editRecipeForm.value.ingredient)
    console.log(this.editRecipeForm.value)
    if(this.edit){
      this.recipeService.updateRecipes(this.id,
        this.editRecipeForm.value.name,
        this.editRecipeForm.value.description,
        this.editRecipeForm.value.imgPath,
        this.editRecipeForm.value.ingredients)
    }
    else
    this.recipeService.addRecipe(
      this.editRecipeForm.value.name,
      this.editRecipeForm.value.description,
      this.editRecipeForm.value.imgPath,
      this.editRecipeForm.value.ingredients);

      this.route.navigate(['recipes'])
  }

  getControls(){
    return (<FormArray>this.editRecipeForm.get('ingredients')).controls
  }

  addIng(){
    (<FormArray>this.editRecipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
    //console.log(this.editRecipeForm.get('ingredients'))
  }

  cancelClicked(){
    this.route.navigate(['/recipes'])
  }

  deleteIng(ing_id:number){
    this.recipeService.deleteIng(ing_id,this.id)
  }

}
