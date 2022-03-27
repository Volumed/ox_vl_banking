RegisterNUICallback('ox_vl_banking:deposit', function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent('ox_vl_banking:deposit', data)
	end
end)

RegisterNUICallback('ox_vl_banking:withdraw', function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent('ox_vl_banking:withdraw', data)
	end
end)

RegisterNUICallback('ox_vl_banking:transfer', function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent('ox_vl_banking:transfer', data)
	end
end)

RegisterNUICallback('ox_vl_banking:close', function(data, cb)
	cb(1)
	if data then
		SetNuiFocus(false, false)
	end
end)
