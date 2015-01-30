class Meal < ActiveRecord::Base
  belongs_to :user
  belongs_to :canon, class_name: 'CanonicalMeal', counter_cache: true
  has_many :ingredients, dependent: :delete_all
  has_many :food_items, class_name: 'Food', through: :ingredients

  before_save :create_canon

  validates :title, presence: true
  # validates :serves, numericality: true, presence: false
  # validates :time, numericality: true, presence: false

  attr_accessor :url

  scope :active, -> { where(active: true) }

  private

  def create_canon
    unless self.url.blank?
      self.canon = CanonicalMeal.find_or_create_by(url: self.url)
    else
      self.canon = nil
    end
  end
end
