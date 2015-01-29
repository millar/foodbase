class Ingredient < ActiveRecord::Base
  belongs_to :meal
  belongs_to :state
  belongs_to :food
end
