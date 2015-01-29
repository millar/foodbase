class Meal < ActiveRecord::Base
  belongs_to :user
  belongs_to :canon, class_name: 'CanonicalMeal', counter_cache: true
  has_many :ingredients
  has_many :food_items, class_name: 'Food', through: :ingredients

  before_save :create_canon

  validates :title, presence: true

  attr_accessor :url

  private

  def create_canon
    if self.url
      self.canon = CanonicalMeal.find_or_create_by(url: self.url)
    else
      self.canon = nil
    end
  end
end
