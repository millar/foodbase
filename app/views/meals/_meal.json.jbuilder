json.(meal, :id, :title, :serves, :time, :created_at, :updated_at)

json.ingredients do
  json.array! meal.ingredients, partial: 'ingredients/ingredient', as: :ingredient
end

json.user do
  json.partial! 'users/user', user: meal.user
end
