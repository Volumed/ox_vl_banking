local ox_inventory = exports.ox_inventory

RegisterNetEvent('vl_banking:deposit', function(data)
    exports.vl_banking:deposit(source, tonumber(data.amount))
end)

RegisterNetEvent('vl_banking:withdraw', function(data)
    exports.vl_banking:withdraw(source, tonumber(data.amount))
end)

RegisterNetEvent('vl_banking:transfer', function(data)
    exports.vl_banking:transfer(source, tonumber(data.to), tonumber(data.amount))
end)

lib.callback.register('vl_banking:getData', function(source)
    local data = {}
    local money = ox_inventory:Search(source, 2, 'money') or 0
    local balance = exports.ox_accounts:get(source, 'bank') or 0
    local players = GetPlayers()

    data = {
        money = money,
        balance = balance,
        players = players
    }

    return data
end)
