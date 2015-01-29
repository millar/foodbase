class Ingredient < ActiveRecord::Base
  belongs_to :meal
  belongs_to :state
  belongs_to :food
  # serialize :amount, Unit

  # attr_accessible :attribute_name

  def amount=(string)
    string.sub! "half", "0.5"
    string.sub! "one", "1"
    string.sub! /(\D)1\/2(\D)/, "\\10.5\\2" # 1/2 -> 0.5 without interfering with other fractions
    self[:amount] = string
  end

  def amount
    self[:string]
  end
end
