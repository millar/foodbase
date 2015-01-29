Rails.application.routes.draw do
  scope '/api', defaults: {format: :json} do
    # API resources

    resources :food, :meals

    get 'dashboard' => 'dashboard#index'
    devise_for :users
  end

  get '(*path)' => 'app#view'
  root 'app#view'
end
