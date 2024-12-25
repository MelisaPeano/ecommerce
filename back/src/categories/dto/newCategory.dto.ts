export class newCategoryDto {
  name: string;

  constructor(partial: Partial<newCategoryDto>) {
    Object.assign(this, partial);
  }
}