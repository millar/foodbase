class CreateCanonicalMeals < ActiveRecord::Migration
  def change
    create_table :canonical_meals do |t|
      t.text :url
      t.integer :meals_count
      t.datetime :created_at, null: false
    end
  end
end
