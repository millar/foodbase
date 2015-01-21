Rails.application.routes.draw do
  scope '/api', defaults: {format: :json} do
    # API resources

    devise_for :users
  end

  get '(*path)' => 'app#view'
  root 'app#view'
end
