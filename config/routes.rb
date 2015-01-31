Rails.application.routes.draw do
  constraints host: /^www\./i do
    match '(*any)' => redirect { |params, request|
      URI.parse(request.url).tap { |uri| uri.host.sub!(/^www\./i, '') }.to_s
    }, via: [:get, :post]
  end

  scope '/api', defaults: {format: :json} do
    # API resources

    resources :foods
    resources :meals do
      member do
        put 'restore' => 'meals#restore'
      end
    end

    namespace :schedule do
      resources :meals
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
