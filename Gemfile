source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
# Use sqlite3 as the development database for Active Record
gem 'sqlite3', group: :development
# Use LESS for stylesheets
gem 'less-rails'
# Use SCSS for some other stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Bootstrap styles
gem 'less-rails-bootstrap'
# AngularJS template injection
gem 'angular-rails-templates'
# Icon framework
gem 'font-awesome-rails'

# Transactional email API
gem 'mailgun_rails'

gem 'responders', '~> 2.0'

gem 'devise'

gem 'redis'

gem 'ruby-units'

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
gem 'unicorn', group: :production

gem 'prerender_rails'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :test, :production do
  gem 'mysql2'
end

gem 'coveralls', require: false
gem 'newrelic_rpm'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  gem 'rspec-rails', '~> 3.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
