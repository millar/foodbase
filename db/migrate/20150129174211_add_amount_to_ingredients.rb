class AddAmountToIngredients < ActiveRecord::Migration
  def change
    add_column :ingredients, :amount, :string
  end
end
