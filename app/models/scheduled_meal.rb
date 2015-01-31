class ScheduledMeal < ActiveRecord::Base
  belongs_to :meal

  before_create :set_position
  before_save :update_position
  after_destroy :decrement_higher_positions

  validates :position, numericality: {integer: true}

  def set_position
    self.position = same_day.count
  end

  def update_position
    if !self.new_record? and self.position_changed?
      new_pos = self.position
      old_pos = self.position_was
      new_pos = 0 if new_pos < 0
      new_pos = same_day.count if new_pos > same_day.count


      if original_pos < new_pos
        same_day.where("position > ? and  position <= ?", original_pos, new_pos).update_all("position = position - 1")
      else
        same_day.where("position < ? and position >= ?", original_pos, new_pos).update_all("position = position + 1")
      end
    end
  end

  def decrement_higher_positions
    same_day.where("position > ?", self.position).update_all("position = position - 1")
  end

  def same_day
    self.user.scheduled_meals.where(date: self.date)
  end
end
