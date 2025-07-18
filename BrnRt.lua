-- === НАСТРОЙКИ ===
local TARGET_CFRAME = CFrame.new(472.692626953125, -6.60106897354126 + 6, -99.03443145751953)
local MOVE_SPEED = 45 -- скорость перемещения (увеличивай до предела, пока не кикает античит)

local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local hrp = character:WaitForChild("HumanoidRootPart")
local humanoid = character:WaitForChild("Humanoid")

-- === ФУНКЦИЯ "ЛЕГАЛЬНОГО" ПЕРЕМЕЩЕНИЯ ===
local function moveToCFrame(targetCFrame, speed)
    local targetPos = targetCFrame.Position

    while (hrp.Position - targetPos).Magnitude > 5 do
        local direction = (targetPos - hrp.Position).Unit
        -- "Легально" двигаем HRP маленькими шагами
        hrp.CFrame = hrp.CFrame + direction * speed * task.wait()
    end

    -- Финальный точный телепорт
    hrp.CFrame = targetCFrame
    hrp.AssemblyLinearVelocity = Vector3.zero
end

-- === ЗАПУСК ===
task.spawn(function()
    moveToCFrame(TARGET_CFRAME, MOVE_SPEED)
    print("[✅] Доставлено к точке!")
end)
