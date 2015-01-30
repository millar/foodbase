Rails.application.routes.draw do
  scope '/api', defaults: {format: :json} do
    # API resources

    resources :foods
    resources :meals do
      member do
        put 'restore' => 'meals#restore'
      end
    end

    get 'dashboard' => 'dashboard#index'

    devise_for :users
    resources :users, only: [:show] do
      scope module: "users" do
        resources :meals, only: [:index]
      end
    end
  end

  get '(*path)' => 'app#view'
  root 'app#view'
end
