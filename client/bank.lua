RegisterNUICallback("vl_banking:deposit", function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent("vl_banking:deposit", data)
	end
end)

RegisterNUICallback("vl_banking:withdraw", function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent("vl_banking:withdraw", data)
	end
end)

RegisterNUICallback("vl_banking:transfer", function(data, cb)
	cb(1)
	if data then
		TriggerServerEvent("vl_banking:transfer", data)
	end
end)

RegisterNUICallback("vl_banking:close", function(data, cb)
	cb(1)
	if data then
		SetNuiFocus(false, false)
	end
end)
