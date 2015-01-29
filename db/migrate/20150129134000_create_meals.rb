class CreateMeals < ActiveRecord::Migration
  def change
    create_table :meals do |t|
      t.string :title
      t.text :notes
      t.integer :serves
      t.integer :time
      t.integer :ingredients_count

      t.boolean :canonical, default: false
      t.references :canon
      t.references :user

      t.timestamps null: false
    end
  end
end
