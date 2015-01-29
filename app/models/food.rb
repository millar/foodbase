class Food < ActiveRecord::Base
  has_many :aliases. class_name: 'FoodAlias'
  has_many :ingredients
  has_many :meals, through: :ingredients
end
