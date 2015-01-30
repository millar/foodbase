class Ingredient < ActiveRecord::Base
  belongs_to :meal
  belongs_to :state
  belongs_to :food

  def amount=(string)
    string = "" if string.nil?
    string.sub! "half", "0.5"
    string.sub! "one", "1"
    string.sub! /(\D)1\/2(\D)/, "\\10.5\\2" # 1/2 -> 0.5 without interfering with other fractions
    self[:amount] = string
  end

  def amount
    begin
      Unit(self.read_attribute(:amount))
    rescue
      ""
    end
  end
end
