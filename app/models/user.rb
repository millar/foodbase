class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, format: { with: /\A[a-z0-9\-_]+([a-z0-9\-_ ]*[a-z0-9\-_]+)?\z/i }
  validates :username, length: { in: 3..16, allow_blank: false }
  validates :username, uniqueness: { case_sensitive: false }
  validates :username, exclusion: { in: %w(admin mod index view page settings account me you users sessions privacy terms help admin forums forum signin signout default signup register new old stats reset top ranks ranking rankings list race clan clans allies alliance alliances bank banks building buildings citizen citizens map task tasks attack log logs defense game tournaments tournament order orders missions spy spies report reports link go system static assets images stylesheets javascripts lib src status surveillance vault economy game games server servers upgrade upgrades construction constructions manage control dashboard ascendancy error throne vehicle vehicles storage warehouse resources supplies chain bonus boost post message inbox messages posts threads thread tech msg market delete edit post put get destroy create update patch type types api username json) }

  before_save { |user| user.username_lower = username.downcase if user.username_changed? }

  has_many :meals
  has_many :scheduled_meals

  attr_accessor :login

  def to_param
    username_lower
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["username_lower = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      where(conditions).first
    end
  end
end
