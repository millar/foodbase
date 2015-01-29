class Ingredient < ActiveRecord::Base
  belongs_to :meal
  belongs_to :state
  belongs_to :food
  serialize :amount, Unit

  def amount=(string)
    string.sub! "half", "0.5"
    string.sub! "one", "1"
    string.sub! /(\D)1\/2(\D)/, "\\10.5\\2" # 1/2 -> 0.5 without interfering with other fractions
    self.write_attribute(:amount, Unit(string))
  end
end
