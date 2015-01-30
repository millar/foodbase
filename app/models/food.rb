require "i18n"

class Food < ActiveRecord::Base
  has_many :aliases, class_name: 'FoodAlias'
  has_many :ingredients
  has_many :meals, through: :ingredients

  before_save do |food|
    if food.name_changed?
      new_slug = food.name.downcase
      new_slug = I18n.transliterate(new_slug)

      food.slug = new_slug
    end
  end

  # def to_param
  #   slug
  # end
end
