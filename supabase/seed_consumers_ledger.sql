-- ==============================================================================
-- 341 COMMUNITY CONSUMERS & MAY 2026 BASELINE METER READINGS
-- ==============================================================================

DO $$
DECLARE
    r_id UUID;
    c_id UUID;
BEGIN
    -- Get or create meter reader id
    SELECT id INTO r_id FROM public.profiles WHERE role = 'METER_READER' LIMIT 1;
    IF r_id IS NULL THEN
        r_id := 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22';
    END IF;

    -- Consumer 129: MR W යාපා රත්නධීර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('129', 'MR W යාපා රත්නධීර', '226/3, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2325, 2340, 15, 'VALID');

    -- Consumer 372: MR පියල් ශ්‍රී මැදගෙදර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('372', 'MR පියල් ශ්‍රී මැදගෙදර', 'PASAL MAWATHA MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2017, 2021, 4, 'VALID');

    -- Consumer 123: MR K. කසුන් චාමර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('123', 'MR K. කසුන් චාමර', '228/1, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1263, 1272, 9, 'VALID');

    -- Consumer 122: MR S.M. කොතලාවල (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('122', 'MR S.M. කොතලාවල', '228/3A, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 312, 319, 7, 'VALID');

    -- Consumer 420: MRS K.D.වර්ෂා ලක්මාලි (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('420', 'MRS K.D.වර්ෂා ලක්මාලි', '228/1C, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 43, 64, 21, 'VALID');

    -- Consumer 120: MR E D චන්ද්‍රලතා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('120', 'MR E D චන්ද්‍රලතා', '228, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 896, 920, 24, 'VALID');

    -- Consumer 121: MRS අනුෂා කොතලාවල (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('121', 'MRS අනුෂා කොතලාවල', '228/3, MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 27, 27, 0, 'VALID');

    -- Consumer 281: MR M.කොතලාවල (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('281', 'MR M.කොතලාවල', '230 MAIN ROAD MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 67, 75, 8, 'VALID');

    -- Consumer 119: MR L කොතලාවල (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('119', 'MR L කොතලාවල', '230/1 MAIN ROAD MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2122, 2138, 16, 'VALID');

    -- Consumer 178: MRS කරලැයින් කොතලාවල (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('178', 'MRS කරලැයින් කොතලාවල', 'MAIN ROAD , MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 347, 356, 9, 'VALID');

    -- Consumer 5: MRS W.S. පෙරේරා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('5', 'MRS W.S. පෙරේරා', 'RANMAL UYANA, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2434, 2443, 9, 'VALID');

    -- Consumer 2: Mr B. ධර්මදාස (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('2', 'Mr B. ධර්මදාස', '373/18, RANMAL UYANA, MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 564, 567, 3, 'VALID');

    -- Consumer 1: Mrs F. හොසේන් (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('1', 'Mrs F. හොසේන්', 'RANMAL UYANA, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1501, 1507, 6, 'VALID');

    -- Consumer 6: MRS B.L. මැනේල් (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('6', 'MRS B.L. මැනේල්', 'RANMAL UYANA, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 349, 360, 11, 'VALID');

    -- Consumer 3: Mr කුමාර ධර්මරත්න (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('3', 'Mr කුමාර ධර්මරත්න', 'RANMAL UYANA, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2666, 2667, 1, 'VALID');

    -- Consumer 29: MR U තරංග පුෂ්පකුමාර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('29', 'MR U තරංග පුෂ්පකුමාර', '371/18, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 973, 973, 0, 'VALID');

    -- Consumer 25: MR මංජුල සංජීව (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('25', 'MR මංජුල සංජීව', '371/9, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 96, 96, 0, 'VALID');

    -- Consumer 28: MR පියසේන උඩවත්ත (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('28', 'MR පියසේන උඩවත්ත', 'SAMAN UYANA, MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 20, 20, 0, 'VALID');

    -- Consumer 27: MRS D.A. අනුලාවතී (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('27', 'MRS D.A. අනුලාවතී', '371/3,SAMAN UYANA,MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2219, 2222, 3, 'VALID');

    -- Consumer 148: MR D.S.S.R.ජයසිංහ (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('148', 'MR D.S.S.R.ජයසිංහ', '371/1 SAMAN UYANA MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 858, 876, 18, 'VALID');

    -- Consumer 435: MR H.Y.N ගුණසේකර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('435', 'MR H.Y.N ගුණසේකර', '371/4, SAMAN UYANA MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1816, 1817, 1, 'VALID');

    -- Consumer 26: MR සරත්චන්ද්‍ර පෙරේරා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('26', 'MR සරත්චන්ද්‍ර පෙරේරා', 'SAMAN UYANA ,MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1530, 1530, 0, 'VALID');

    -- Consumer 30: MR ගුණපාල සමරනායක (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('30', 'MR ගුණපාල සමරනායක', 'SAMAN UYANA MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2223, 2240, 17, 'VALID');

    -- Consumer 349: MISS සචින්දිකා විජේසිංහ (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('349', 'MISS සචින්දිකා විජේසිංහ', 'SAMAN UYANA MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1302, 1315, 13, 'VALID');

    -- Consumer 21: MR M.Y. ධම්මික ගුණසේකර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('21', 'MR M.Y. ධම්මික ගුණසේකර', 'SAMAN UYANA MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2454, 2454, 0, 'VALID');

    -- Consumer 444: MRS M.N.L.කුමාරි රණසිංහ (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('444', 'MRS M.N.L.කුමාරි රණසිංහ', 'MAIN ROAD, MAGAMMANA', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 0, 24, 24, 'VALID');

    -- Consumer 170: MRS U. ආරියවතී (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('170', 'MRS U. ආරියවතී', 'SAMAN Uyana MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1567, 1576, 9, 'VALID');

    -- Consumer 174: MR U.J. ලක්ෂ්මන් පෙරේරා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('174', 'MR U.J. ලක්ෂ්මන් පෙරේරා', '371/15, SAMAN UYANA, MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 260, 277, 17, 'VALID');

    -- Consumer 23: MR A.A.L. පෙරේරා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('23', 'MR A.A.L. පෙරේරා', 'MAIN ROAD, MAGAMMANA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 375, 402, 27, 'VALID');

    -- Consumer 175: MRS G.K. උපේක්ෂා ප්‍රියංකා (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('175', 'MRS G.K. උපේක්ෂා ප්‍රියංකා', '371/8A, MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 154, 154, 0, 'VALID');

    -- Consumer 355: MR S A ධනුෂ්ක සම්පත් (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('355', 'MR S A ධනුෂ්ක සම්පත්', '231A/L/05 MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1451, 1488, 37, 'VALID');

    -- Consumer 436: MRS M A ක්‍රිෂාන්ති (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('436', 'MRS M A ක්‍රිෂාන්ති', '230 MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 141, 150, 9, 'VALID');

    -- Consumer 438: MR H.D.ජානක ප්‍රසන්න කුමාර (MAIN ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('438', 'MR H.D.ජානක ප්‍රසන්න කුමාර', '371/2 MAGAMMANA HOMAGAMA (MAIN ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 132, 132, 0, 'VALID');

    -- Consumer 363: MR H G L JAYATHUNGA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('363', 'MR H G L JAYATHUNGA', '370/2, MAGAMMANA HOMAGAMA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1105, 1125, 20, 'VALID');

    -- Consumer 98.1: MR U.L.R.A. CHANDIMAL (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.1', 'MR U.L.R.A. CHANDIMAL', 'MAIN ROAD HOMAGAMA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2430, 2430, 0, 'VALID');

    -- Consumer 7: MR H. PIYASENA FERNANDO (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('7', 'MR H. PIYASENA FERNANDO', '366/4,SARWODAYA WATTA,MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3128, 3140, 12, 'VALID');

    -- Consumer 8: MRS G. SOMAWATHI (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('8', 'MRS G. SOMAWATHI', 'SARWODAYA WATTA MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3752, 3764, 12, 'VALID');

    -- Consumer 51: MR R. RATHNAJEEWA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('51', 'MR R. RATHNAJEEWA', '366/3 SARWODAYA WATTA MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 4011, 4041, 30, 'VALID');

    -- Consumer 55: MR M. SARATH DE SILVA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('55', 'MR M. SARATH DE SILVA', 'SARWODAYA WATTA MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2589, 2589, 0, 'VALID');

    -- Consumer 58: MRS J.A. AIRANGANI (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('58', 'MRS J.A. AIRANGANI', '366/8, SARWODAYA WATTA, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2027, 2027, 0, 'VALID');

    -- Consumer 17: MR S.M. ANANDA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('17', 'MR S.M. ANANDA', '366/9, SARWODAYA WATTA, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2030, 2034, 4, 'VALID');

    -- Consumer 20: MR SUMITH NISHANTHA VAAS (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('20', 'MR SUMITH NISHANTHA VAAS', '366/11, SARWODAYA WATTA, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 238, 252, 14, 'VALID');

    -- Consumer 19: MRS G.H. MARGRET (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('19', 'MRS G.H. MARGRET', 'SARWODAYA WATTA MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2393, 2400, 7, 'VALID');

    -- Consumer 16: MRS AJANTHI KALPANA VAAS (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('16', 'MRS AJANTHI KALPANA VAAS', '366/10, SARWODAYA WATTA, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 161, 182, 21, 'VALID');

    -- Consumer 18: MR H. INDIKA PRRETHIMAL (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('18', 'MR H. INDIKA PRRETHIMAL', '366/13, SARWODAYA WATTA, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1463, 1471, 8, 'VALID');

    -- Consumer 57: MR G.M.M.S. MEGHASURIYA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('57', 'MR G.M.M.S. MEGHASURIYA', '363/8 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1480, 1480, 0, 'VALID');

    -- Consumer 112: MR S.S. SAMARAKOON (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('112', 'MR S.S. SAMARAKOON', 'BATAHENA ROAD , MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 560, 561, 1, 'VALID');

    -- Consumer 50: MR S.J. RATHNAYAKE (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('50', 'MR S.J. RATHNAYAKE', '363/5 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1664, 1680, 16, 'VALID');

    -- Consumer 197: MR R.M.A. NIMALSIRI (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('197', 'MR R.M.A. NIMALSIRI', '364/S, BATAHENA ROAD, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 818, 818, 0, 'VALID');

    -- Consumer 188: MR T D N PATHMANATHA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('188', 'MR T D N PATHMANATHA', '409/4/1 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1424, 1436, 12, 'VALID');

    -- Consumer 199: MRS K. ANULA INDRANI (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('199', 'MRS K. ANULA INDRANI', '409/5, BATAHENA ROAD, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 457, 460, 3, 'VALID');

    -- Consumer 189: MR S. ATHAPATHTHU (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('189', 'MR S. ATHAPATHTHU', '409/07, BATAHENA ROAD, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 274, 276, 2, 'VALID');

    -- Consumer 196: MR A.M.RASANTHA LAKMAL (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('196', 'MR A.M.RASANTHA LAKMAL', '409/2/C BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 199, 210, 11, 'VALID');

    -- Consumer 422: MRS N D DHANANJA ATHAPATHTHU (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('422', 'MRS N D DHANANJA ATHAPATHTHU', '409/15, BATAHENA ROAD, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 967, 971, 4, 'VALID');

    -- Consumer 351: MR S P BIMALKA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('351', 'MR S P BIMALKA', '409/21, BATAHENA ROAD, MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2038, 2060, 22, 'VALID');

    -- Consumer 308: MRS T S D PERERA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('308', 'MRS T S D PERERA', '54/14 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1869, 1895, 26, 'VALID');

    -- Consumer 293: MR K.R. PASKUWEL (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('293', 'MR K.R. PASKUWEL', '409/AR/23 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1842, 1842, 0, 'VALID');

    -- Consumer 296: MR A M N A ADIKARI (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('296', 'MR A M N A ADIKARI', 'BATAHENA MAGAMMANA HOMAGAMA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1234, 1252, 18, 'VALID');

    -- Consumer 340: MR R M DISSANAYAKE (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('340', 'MR R M DISSANAYAKE', '28 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1095, 1110, 15, 'VALID');

    -- Consumer 285: MR M. PRATAP MAHENDRA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('285', 'MR M. PRATAP MAHENDRA', '409/19 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 524, 531, 7, 'VALID');

    -- Consumer 316: MR R M TIKIRIBANDA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('316', 'MR R M TIKIRIBANDA', '403/4 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1298, 1304, 6, 'VALID');

    -- Consumer 312: MR A G P D SAMPATH (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('312', 'MR A G P D SAMPATH', '404/17 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1208, 1208, 0, 'VALID');

    -- Consumer 329: MR H T G A D K WARNASOMA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('329', 'MR H T G A D K WARNASOMA', '404/18 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1416, 1437, 21, 'VALID');

    -- Consumer 374: MRS S A RUWANTHI MANGALIKA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('374', 'MRS S A RUWANTHI MANGALIKA', '404/18 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1020, 1035, 15, 'VALID');

    -- Consumer 360: MRS I A DHARSHANA SAMANTHA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('360', 'MRS I A DHARSHANA SAMANTHA', '411/79 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1424, 1442, 18, 'VALID');

    -- Consumer 383: MRS P A RANATHUNGA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('383', 'MRS P A RANATHUNGA', 'BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1001, 1019, 18, 'VALID');

    -- Consumer 387: MRS W I T PERERA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('387', 'MRS W I T PERERA', 'BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1022, 1035, 13, 'VALID');

    -- Consumer 385: MRS SRIYANI PUSHPALATHA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('385', 'MRS SRIYANI PUSHPALATHA', 'BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 135, 136, 1, 'VALID');

    -- Consumer 409: MRS JINANI RUWANDHIKA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('409', 'MRS JINANI RUWANDHIKA', '404/5 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 756, 764, 8, 'VALID');

    -- Consumer 410: MRS EMILDA MERIYAN DIAS (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('410', 'MRS EMILDA MERIYAN DIAS', '404/3 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 100, 100, 0, 'VALID');

    -- Consumer 416: MRS SAWANI DILANKA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('416', 'MRS SAWANI DILANKA', '404/8 MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1003, 1024, 21, 'VALID');

    -- Consumer 417: MR ASANAKA MISHANTHA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('417', 'MR ASANAKA MISHANTHA', '404/2 BATAHENA ROAD (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 406, 411, 5, 'VALID');

    -- Consumer 424: MR H SUMINDHA KUMARA (BATAHENA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('424', 'MR H SUMINDHA KUMARA', '404/4 BATAHENA ROAD MAGAMMANA (BATAHENA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 966, 984, 18, 'VALID');

    -- Consumer 187: MR H.A.S. KUMARASIRI (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('187', 'MR H.A.S. KUMARASIRI', '150/2, MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 234, 234, 0, 'VALID');

    -- Consumer 183: MR H.M.R . SUSANTHA BANDARA (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('183', 'MR H.M.R . SUSANTHA BANDARA', '154/E2, MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1694, 1705, 11, 'VALID');

    -- Consumer 186: MR LAL PERERA (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('186', 'MR LAL PERERA', '154/E2, MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 569, 586, 17, 'VALID');

    -- Consumer 185: MRS SIRINI LIYANAGAMAGE (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('185', 'MRS SIRINI LIYANAGAMAGE', '153/3E, MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3196, 3214, 18, 'VALID');

    -- Consumer 184: MRS D.D. AMALI UDAYANGANI (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('184', 'MRS D.D. AMALI UDAYANGANI', '154/E2/A, MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 149, 159, 10, 'VALID');

    -- Consumer 201: MR JAYANATH WICKCRAMABAHU (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('201', 'MR JAYANATH WICKCRAMABAHU', '154/3B, ABAGAHALANDA, (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 249, 256, 7, 'VALID');

    -- Consumer 204: MR B.H.WIMAL SHANTHA (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('204', 'MR B.H.WIMAL SHANTHA', '154/3/D, ABAGAHALANDA, MAGAMMANA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 499, 504, 5, 'VALID');

    -- Consumer 133: MR S.K. SARATH SUBASINGHE (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('133', 'MR S.K. SARATH SUBASINGHE', '151/7 MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1227, 1227, 0, 'VALID');

    -- Consumer 143: MR SAMAN SENAVIRATHNE (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('143', 'MR SAMAN SENAVIRATHNE', '157/3 MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1355, 1362, 7, 'VALID');

    -- Consumer 156: MRS G.D.PADMA CHANDRAKANTHI (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('156', 'MRS G.D.PADMA CHANDRAKANTHI', 'MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2536, 2536, 0, 'VALID');

    -- Consumer 139: MRS RANJANI WITHANA (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('139', 'MRS RANJANI WITHANA', '154 MAGAMMANA HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1242, 1242, 0, 'VALID');

    -- Consumer 140: MR LALITH KUMARA WITHANA (ABAGAHALANDA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('140', 'MR LALITH KUMARA WITHANA', '154/A MAGAMMAN HOMAGAMA (ABAGAHALANDA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1393, 1393, 0, 'VALID');

    -- Consumer 135: MR PRASANNA KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('135', 'MR PRASANNA KOTHALAWELA', '156 / A MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3505, 3520, 15, 'VALID');

    -- Consumer 137: MR D.S.S.A. JAYASINGHE (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('137', 'MR D.S.S.A. JAYASINGHE', '155/ A MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2483, 2489, 6, 'VALID');

    -- Consumer 134: MR PIYAL KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('134', 'MR PIYAL KOTHALAWELA', '156/1 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2860, 2861, 1, 'VALID');

    -- Consumer 333: MR S P KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('333', 'MR S P KOTHALAWELA', '157/1 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 801, 807, 6, 'VALID');

    -- Consumer 136: MR SARATH K. KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('136', 'MR SARATH K. KOTHALAWELA', '157/2, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2, 2, 0, 'VALID');

    -- Consumer 429: MR VINDANA PRIYA KUMARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('429', 'MR VINDANA PRIYA KUMARA', '157/1/4 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 350, 361, 11, 'VALID');

    -- Consumer 144: MR H.ROHITHA NERANJANA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('144', 'MR H.ROHITHA NERANJANA', '163/1 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1468, 1478, 10, 'VALID');

    -- Consumer 346: MR K CHANNA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('346', 'MR K CHANNA', '158 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1353, 1371, 18, 'VALID');

    -- Consumer 146: MRS K. VEENANI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('146', 'MRS K. VEENANI', '158/1/B, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 506, 539, 33, 'VALID');

    -- Consumer 138: MR K. KARUNADASA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('138', 'MR K. KARUNADASA', '163, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1815, 1835, 20, 'VALID');

    -- Consumer 132: MRS JAYANTHI KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('132', 'MRS JAYANTHI KOTHALAWELA', '158/2 KOTHALAWELA MAWATHA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2243, 2258, 15, 'VALID');

    -- Consumer 216: MR M.D.R. FONSEKA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('216', 'MR M.D.R. FONSEKA', '158/1 KOTHALAWELA MAWATHA, (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 55, 55, 0, 'VALID');

    -- Consumer 147: MRS K.KUSUMAWATHI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('147', 'MRS K.KUSUMAWATHI', '158/1A MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2865, 2865, 0, 'VALID');

    -- Consumer 153: MRS H. INOKA PRIYADHARSHANI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('153', 'MRS H. INOKA PRIYADHARSHANI', '158/7 KOTHALAWELA MAWATHA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1556, 1563, 7, 'VALID');

    -- Consumer 382: MRS N P KOTHALAWELA- (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('382', 'MRS N P KOTHALAWELA-', '210 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1495, 1527, 32, 'VALID');

    -- Consumer 151: MR NALIN D.NANAYAKKARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('151', 'MR NALIN D.NANAYAKKARA', 'KOTHALAWELA MAWATA MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1718, 1728, 10, 'VALID');

    -- Consumer 113.1: MR K.W. EDEEMA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('113.1', 'MR K.W. EDEEMA', '158/2 KOTHALAWELA MAWATA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 104, 104, 0, 'VALID');

    -- Consumer 113.2: MR K.W. EDEEMA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('113.2', 'MR K.W. EDEEMA', '158/2B KOTHALAWELA MAWATA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 864, 868, 4, 'VALID');

    -- Consumer 113.3: MR K.W. EDEEMA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('113.3', 'MR K.W. EDEEMA', '158/2A KOTHALAWELA MAWATA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1461, 1477, 16, 'VALID');

    -- Consumer 275: MR JANAKA DHARSHANA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('275', 'MR JANAKA DHARSHANA', 'MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 328, 334, 6, 'VALID');

    -- Consumer 396: MRS D S KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('396', 'MRS D S KOTHALAWELA', 'KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1297, 1316, 19, 'VALID');

    -- Consumer 398: MRS O K AMITHA AMARAWATHI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('398', 'MRS O K AMITHA AMARAWATHI', '211 /10 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 191, 191, 0, 'VALID');

    -- Consumer 397: MR B P RATHNAYAKE (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('397', 'MR B P RATHNAYAKE', '211 8/A KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 364, 380, 16, 'VALID');

    -- Consumer 264: MR D N N NANAYAKKARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('264', 'MR D N N NANAYAKKARA', '211/1K KOTHALAWELA MAWATA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2974, 3019, 45, 'VALID');

    -- Consumer 242: MR SUSINDRA LAKMAL (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('242', 'MR SUSINDRA LAKMAL', '211/1J KOTHALAWELA MAWATA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2201, 2219, 18, 'VALID');

    -- Consumer 305: MR C M M CHANDRASEKARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('305', 'MR C M M CHANDRASEKARA', '211 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1753, 1766, 13, 'VALID');

    -- Consumer 256: MRS KUMARI BALASOORIYA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('256', 'MRS KUMARI BALASOORIYA', '211/4, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1752, 1761, 9, 'VALID');

    -- Consumer 257: MRS JANAKI PRIYANGIKA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('257', 'MRS JANAKI PRIYANGIKA', '211/1E, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 128, 141, 13, 'VALID');

    -- Consumer 365: MR DHARSHANA SAMPATH (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('365', 'MR DHARSHANA SAMPATH', '211/11/D, KOTHALAWELA ROAD (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2079, 2091, 12, 'VALID');

    -- Consumer 282: MRS V.V.ABEYSEKARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('282', 'MRS V.V.ABEYSEKARA', '211/8, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 637, 652, 15, 'VALID');

    -- Consumer 419: MR ANURA PRIYANTHA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('419', 'MR ANURA PRIYANTHA', '212/A MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 629, 645, 16, 'VALID');

    -- Consumer 265: MR ASANKA PADMAKUMARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('265', 'MR ASANKA PADMAKUMARA', '176/5, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2697, 2719, 22, 'VALID');

    -- Consumer 364: MR H P AKALANKA KOTHALAWELA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('364', 'MR H P AKALANKA KOTHALAWELA', '176/2/1 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2336, 2349, 13, 'VALID');

    -- Consumer 253: MR CHANDIMAL KUMARASIRI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('253', 'MR CHANDIMAL KUMARASIRI', '176/A, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1594, 1604, 10, 'VALID');

    -- Consumer 389: MRS SUNETRA MALKANTHI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('389', 'MRS SUNETRA MALKANTHI', '176/A2 , KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 0, 0, 0, 'VALID');

    -- Consumer 251: MRS L.R. ANULAWATHI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('251', 'MRS L.R. ANULAWATHI', '211/3, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1807, 1821, 14, 'VALID');

    -- Consumer 246: MR V W RANAWEERA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('246', 'MR V W RANAWEERA', '211/A, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1916, 1935, 19, 'VALID');

    -- Consumer 247.1: MRS CHAMILA SENANI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('247.1', 'MRS CHAMILA SENANI', '211/1, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1854, 1866, 12, 'VALID');

    -- Consumer 247.2: MRS CHAMILA SENANI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('247.2', 'MRS CHAMILA SENANI', '211/1, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1324, 1338, 14, 'VALID');

    -- Consumer 247/3: MRS CHAMILA SENANI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('247/3', 'MRS CHAMILA SENANI', 'MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1063, 1089, 26, 'VALID');

    -- Consumer 248: MR MAHESH ASANKA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('248', 'MR MAHESH ASANKA', '211/G KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 369, 381, 12, 'VALID');

    -- Consumer 330: MR H T AJITH (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('330', 'MR H T AJITH', '211/B KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2130, 2151, 21, 'VALID');

    -- Consumer 249: MR CHAMARA PRADEEP (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('249', 'MR CHAMARA PRADEEP', '211/C, KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 448, 448, 0, 'VALID');

    -- Consumer 399: MR W M NANDASENA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('399', 'MR W M NANDASENA', '211/5 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 464, 472, 8, 'VALID');

    -- Consumer 399.1: MR W M NANDASENA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('399.1', 'MR W M NANDASENA', '211/5 KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 18, 35, 17, 'VALID');

    -- Consumer 440: MRS C.SANDRA DILISHIYA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('440', 'MRS C.SANDRA DILISHIYA', '211/5AMAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1235, 1253, 18, 'VALID');

    -- Consumer 254: MR ARUNA UDARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('254', 'MR ARUNA UDARA', '212/01/D, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1985, 2002, 17, 'VALID');

    -- Consumer 239: MRS K.D . LEELAWATHI (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('239', 'MRS K.D . LEELAWATHI', '212/1, MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2558, 2567, 9, 'VALID');

    -- Consumer 295: MRS W D I K RANASINGHE (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('295', 'MRS W D I K RANASINGHE', 'KOTHALAWELA ROAD MAGAMMANA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1147, 1165, 18, 'VALID');

    -- Consumer 190: MR W.D.I.K. RANASINGHE (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('190', 'MR W.D.I.K. RANASINGHE', '212/1B MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 278, 278, 0, 'VALID');

    -- Consumer 215: MR NIMALASIRI BANDULA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('215', 'MR NIMALASIRI BANDULA', '213/5,MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1160, 1160, 0, 'VALID');

    -- Consumer 284: MR MALAGE AJITH ROHANA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('284', 'MR MALAGE AJITH ROHANA', '213 MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 383, 388, 5, 'VALID');

    -- Consumer 206: MR G.P. KUMARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('206', 'MR G.P. KUMARA', 'MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 72, 94, 22, 'VALID');

    -- Consumer 401: MR G.P. KUMARA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('401', 'MR G.P. KUMARA', 'MAGAMMANA HOMAGAMA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 582, 589, 7, 'VALID');

    -- Consumer 413: MRS D.P WIJEPALA DE ZOYSA (KOTHALAWELA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('413', 'MRS D.P WIJEPALA DE ZOYSA', '51/19 SOMALANKAARA MAWATHA (KOTHALAWELA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1321, 1332, 11, 'VALID');

    -- Consumer 207: MRS H.D. ගිම්හානි ප්‍රේමතිලක (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('207', 'MRS H.D. ගිම්හානි ප්‍රේමතිලක', '231/L/59, ARALIYA LAND, MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2450, 2464, 14, 'VALID');

    -- Consumer 222: MR K.M. වනිගසූරිය (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('222', 'MR K.M. වනිගසූරිය', 'ARALIYA LAND , MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1957, 1966, 9, 'VALID');

    -- Consumer 222.1: MR K.M.වනිගසූරිය (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('222.1', 'MR K.M.වනිගසූරිය', 'ARALIYA LAND , MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 512, 530, 18, 'VALID');

    -- Consumer 404: MR D.S.ලියනගේ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('404', 'MR D.S.ලියනගේ', '555/5, ARALIYA LAND, MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 299, 299, 0, 'VALID');

    -- Consumer 214: MRS ක්‍රිෂාන්ති ජයසුන්දර (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('214', 'MRS ක්‍රිෂාන්ති ජයසුන්දර', '231/L/61, ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1165, 1178, 13, 'VALID');

    -- Consumer 395: MRS D P N C DIAS (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('395', 'MRS D P N C DIAS', 'ARALIYA LAND MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 833, 843, 10, 'VALID');

    -- Consumer 271: MRS සුජාතා රත්නායක (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('271', 'MRS සුජාතා රත්නායක', '231/L/54,ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 839, 851, 12, 'VALID');

    -- Consumer 238: MR N.P.P. කොස්තා (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('238', 'MR N.P.P. කොස්තා', 'ARALIYA LAND MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1654, 1670, 16, 'VALID');

    -- Consumer 203: MR චින්තක ජයසිංහ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('203', 'MR චින්තක ජයසිංහ', '233/1/E, ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2141, 2159, 18, 'VALID');

    -- Consumer 127: MR පී.ප්‍රේමදාස (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('127', 'MR පී.ප්‍රේමදාස', '233/1 ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2213, 2217, 4, 'VALID');

    -- Consumer 177: MR රන්ජිත් රූපසිංහ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('177', 'MR රන්ජිත් රූපසිංහ', '232/3 ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 791, 791, 0, 'VALID');

    -- Consumer 220: MRS මදුරිකා සුභාෂිණී (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('220', 'MRS මදුරිකා සුභාෂිණී', '231/C , ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 370, 370, 0, 'VALID');

    -- Consumer 208: MR K. අසංක මධුරංග (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('208', 'MR K. අසංක මධුරංග', '231/L/49, ARALIYA LANDMAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1283, 1286, 3, 'VALID');

    -- Consumer 236: MR R.D.K. හේවාවිතාරණ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('236', 'MR R.D.K. හේවාවිතාරණ', '231/L/40, ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 447, 447, 0, 'VALID');

    -- Consumer 209: MR ලලිත් සේනාරත්න (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('209', 'MR ලලිත් සේනාරත්න', '39, ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1884, 1891, 7, 'VALID');

    -- Consumer 231: MR සම්පත් පුෂ්පකුමාර (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('231', 'MR සම්පත් පුෂ්පකුමාර', '231/1/37, ARALIYA LAND, MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1887, 1890, 3, 'VALID');

    -- Consumer 217: MRS E.D. මධුකුසලානි (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('217', 'MRS E.D. මධුකුසලානි', '231/L/36, ABAGAHALANDA, MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 916, 928, 12, 'VALID');

    -- Consumer 237: MR K.K. අජිත් (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('237', 'MR K.K. අජිත්', '231/L/29, KIRIWATTUDUWA ROAD, (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2799, 2799, 0, 'VALID');

    -- Consumer 219: MR S. මිපාගල (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('219', 'MR S. මිපාගල', '160, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 502, 526, 24, 'VALID');

    -- Consumer 279: MR A. කලබෝවිල (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('279', 'MR A. කලබෝවිල', '388/G, ARALIYA LAND, MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1484, 1496, 12, 'VALID');

    -- Consumer 176: MRS H A සීලා කාන්ති (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('176', 'MRS H A සීලා කාන්ති', '232/1 MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2025, 2043, 18, 'VALID');

    -- Consumer 126: MR H A සීලා කාන්ති (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('126', 'MR H A සීලා කාන්ති', '231/1, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1164, 1165, 1, 'VALID');

    -- Consumer 230: MR රුමේෂ් මාලිංග (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('230', 'MR රුමේෂ් මාලිංග', '231/L/50, KIRIWATHTHUDUWA ROAD, (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 952, 965, 13, 'VALID');

    -- Consumer 125: MR A.A.ජයවර්ධන (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('125', 'MR A.A.ජයවර්ධන', '231/9/A MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1506, 1517, 11, 'VALID');

    -- Consumer 306: MRS A නිලානි නිශාන්ති (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('306', 'MRS A නිලානි නිශාන්ති', '231/4/A MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 327, 351, 24, 'VALID');

    -- Consumer 213: MRS S.D.R. දර්ශනී (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('213', 'MRS S.D.R. දර්ශනී', '231/L/13, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 168, 183, 15, 'VALID');

    -- Consumer 212: MR චාමර විජේසිංහ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('212', 'MR චාමර විජේසිංහ', '248/1, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 24, 27, 3, 'VALID');

    -- Consumer 212.1: MR චාමර විජේසිංහ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('212.1', 'MR චාමර විජේසිංහ', '248/1, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 472, 484, 12, 'VALID');

    -- Consumer 211: MR D.S.R.A. ජයසිංහ (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('211', 'MR D.S.R.A. ජයසිංහ', '231/L/7, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2936, 2958, 22, 'VALID');

    -- Consumer 210: MRS G.A.I. දේවිකා (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('210', 'MRS G.A.I. දේවිකා', '231/L6, MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 258, 267, 9, 'VALID');

    -- Consumer 297: MRS W T S W S පෙරේරා (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('297', 'MRS W T S W S පෙරේරා', '231/L/5 ARALIYA LAND MAGAMMANA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1637, 1661, 24, 'VALID');

    -- Consumer 359: MRS W T S W S පෙරේරා (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('359', 'MRS W T S W S පෙරේරා', '231A/L/05 MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1218, 1233, 15, 'VALID');

    -- Consumer 425: MRS W R ආලෝකා කුමාරි (ARALIYA LAND)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('425', 'MRS W R ආලෝකා කුමාරි', '231/L/L2 MAGAMMANA HOMAGAMA (ARALIYA LAND)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 259, 261, 2, 'VALID');

    -- Consumer 154: MR G. මර්වින් (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('154', 'MR G. මර්වින්', 'MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 399, 424, 25, 'VALID');

    -- Consumer 34: MR R.P.D. නවින්ද්‍ර විලාන් (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('34', 'MR R.P.D. නවින්ද්‍ර විලාන්', 'DOLEKADE JUNCTION HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2354, 2360, 6, 'VALID');

    -- Consumer 192: MRS H.මැනේල් දාබරේ (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('192', 'MRS H.මැනේල් දාබරේ', '360/6, MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 327, 366, 39, 'VALID');

    -- Consumer 31: MRS කමලා අරන්දගල (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('31', 'MRS කමලා අරන්දගල', '360/1A, MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2301, 2325, 24, 'VALID');

    -- Consumer 98.2: MR U.L.R.A. චන්ද්‍රමාලි (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.2', 'MR U.L.R.A. චන්ද්‍රමාලි', 'MAIN ROAD HOMAGAMA - 17 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 614, 615, 1, 'VALID');

    -- Consumer 98.3: MR U.L.R.A. චන්ද්‍රමාලි (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.3', 'MR U.L.R.A. චන්ද්‍රමාලි', 'MAIN ROAD HOMAGAMA - 18 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3664, 3684, 20, 'VALID');

    -- Consumer 98.4: MR U.L.R.A. චන්ද්‍රමාලි (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.4', 'MR U.L.R.A. චන්ද්‍රමාලි', 'MAIN ROAD HOMAGAMA - 19 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 693, 696, 3, 'VALID');

    -- Consumer 98.5: MR U.L.R.A. චන්ද්‍රමාලි (SMV) (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.5', 'MR U.L.R.A. චන්ද්‍රමාලි (SMV)', 'MAIN ROAD HOMAGAMA - 22 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 442, 442, 0, 'VALID');

    -- Consumer 98.6: MR U.L.R.A. චන්ද්‍රමාලි (LAK RU) (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.6', 'MR U.L.R.A. චන්ද්‍රමාලි (LAK RU)', 'MAIN ROAD HOMAGAMA - 20 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 985, 987, 2, 'VALID');

    -- Consumer 98.7: MR U.L.R.A. චන්ද්‍රමාලි (OPTICALS) (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('98.7', 'MR U.L.R.A. චන්ද්‍රමාලි (OPTICALS)', 'MAIN ROAD HOMAGAMA - 21 (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 339, 345, 6, 'VALID');

    -- Consumer 35.2: MR U.L.R.A. චන්දන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('35.2', 'MR U.L.R.A. චන්දන', 'MAIN ROAD HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 994, 1005, 11, 'VALID');

    -- Consumer 35.1: MR U.L.R.A. චන්දන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('35.1', 'MR U.L.R.A. චන්දන', '148, MAGAMMANA HOMAGAMA Commini (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2444, 2458, 14, 'VALID');

    -- Consumer 388.1: MR U.L.R.A. චන්දන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('388.1', 'MR U.L.R.A. චන්දන', '344/12 MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 58, 60, 2, 'VALID');

    -- Consumer 388.2: MR U.L.R.A. චන්දන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('388.2', 'MR U.L.R.A. චන්දන', '344/12 MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 332, 335, 3, 'VALID');

    -- Consumer 270: සර්වෝදය බැංකුව (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('270', 'සර්වෝදය බැංකුව', 'DOLEKADE, MAGAMMANA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 112, 138, 26, 'VALID');

    -- Consumer 191.1: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.1', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Lee maduwa) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 136, 142, 6, 'VALID');

    -- Consumer 191.2: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.2', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Hotel) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 644, 646, 2, 'VALID');

    -- Consumer 191.3: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.3', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Sillara Kade) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 537, 544, 7, 'VALID');

    -- Consumer 191.4: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.4', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Bakery) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 234, 237, 3, 'VALID');

    -- Consumer 191.5: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.5', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (F) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1628, 1646, 18, 'VALID');

    -- Consumer 191.6: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.6', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE , MAGAMMANA (G) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 382, 390, 8, 'VALID');

    -- Consumer 191.7: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.7', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (H) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1551, 1576, 25, 'VALID');

    -- Consumer 191.8: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.8', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (J) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1658, 1666, 8, 'VALID');

    -- Consumer 191.9: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.9', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Hotel) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1657, 1668, 11, 'VALID');

    -- Consumer 191.11: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.11', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (P) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 305, 316, 11, 'VALID');

    -- Consumer 191.12: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.12', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (N) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 152, 152, 0, 'VALID');

    -- Consumer 191.14: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.14', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (L) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 316, 321, 5, 'VALID');

    -- Consumer 191.15: MR සුසන්ත ගුණවර්ධන (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('191.15', 'MR සුසන්ත ගුණවර්ධන', 'DOLEKAGE, MAGAMMANA (Q) (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 108, 108, 0, 'VALID');

    -- Consumer 32: MRS J.G. චන්ද්‍රාවතී (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('32', 'MRS J.G. චන්ද්‍රාවතී', '344/1, MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 142, 154, 12, 'VALID');

    -- Consumer 109: MRS සෝමා දොඩම්වත්ත (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('109', 'MRS සෝමා දොඩම්වත්ත', '344 DOLEKADE MAGAMMANA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2429, 2429, 0, 'VALID');

    -- Consumer 33: MR සිරිසේන ජයසූරිය (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('33', 'MR සිරිසේන ජයසූරිය', '339 MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 211, 221, 10, 'VALID');

    -- Consumer 411: MRS මිපාගලගේ කමලාවතී (DOLE KADE)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('411', 'MRS මිපාගලගේ කමලාවතී', '296/1 MAGAMMANA HOMAGAMA (DOLE KADE)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 355, 357, 2, 'VALID');

    -- Consumer 36: MR G.A. සෝමදාස (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('36', 'MR G.A. සෝමදාස', '347/1 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2535, 2592, 57, 'VALID');

    -- Consumer 289: MR G.A දර්ශන සමීර (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('289', 'MR G.A දර්ශන සමීර', '347/1/1 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2568, 2577, 9, 'VALID');

    -- Consumer 89: MR P ROHANA SAMAN PEIRIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('89', 'MR P ROHANA SAMAN PEIRIS', '345/3 MAIN ROAD HOMAGAMA. (Home) (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2375, 2393, 18, 'VALID');

    -- Consumer 90: MR P WIMALASENA PEIRIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('90', 'MR P WIMALASENA PEIRIS', '345/1 MAIN ROAD HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1075, 1075, 0, 'VALID');

    -- Consumer 162: MRS NAYANI PEIRIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('162', 'MRS NAYANI PEIRIS', '345/4 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1588, 1588, 0, 'VALID');

    -- Consumer 292: MR PATMASIRI GORAKAPITIYA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('292', 'MR PATMASIRI GORAKAPITIYA', '345/2 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2654, 2668, 14, 'VALID');

    -- Consumer 63: MR G.L. BANDUSIRI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('63', 'MR G.L. BANDUSIRI', '335 MAGAMMANA MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3984, 3986, 2, 'VALID');

    -- Consumer 277: MR P. ROHANA SAMAN PEIRIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('277', 'MR P. ROHANA SAMAN PEIRIS', '345/3, MAGAMMANA , (Hard ware) (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1543, 1549, 6, 'VALID');

    -- Consumer 276: MRS P. PRIYANKA WASANTHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('276', 'MRS P. PRIYANKA WASANTHI', '263/6/1, MAGAMMANA HOMAGAMA A (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 67, 67, 0, 'VALID');

    -- Consumer 319: MR P R S PIERIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('319', 'MR P R S PIERIS', '345/3 MAGAMMANA, HOMAGAMA E (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1569, 1575, 6, 'VALID');

    -- Consumer 336: MR P R S PIERIS (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('336', 'MR P R S PIERIS', '345/3, MAGAMMANA HOMAGAMA D (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 777, 785, 8, 'VALID');

    -- Consumer 391: P R S PIERIS -F (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('391', 'P R S PIERIS -F', '345/3, MAGAMMANA HOMAGAMA F (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 757, 757, 0, 'VALID');

    -- Consumer 392: P R S PIERIS -G (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('392', 'P R S PIERIS -G', '345/3, MAGAMMANA HOMAGAMA G (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2190, 2196, 6, 'VALID');

    -- Consumer 107: MRS CHAMPIKA HETTIARACHCHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('107', 'MRS CHAMPIKA HETTIARACHCHI', '336/7 ,SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 768, 773, 5, 'VALID');

    -- Consumer 12: MRS S.A. ROSALIN NONA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('12', 'MRS S.A. ROSALIN NONA', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1356, 1369, 13, 'VALID');

    -- Consumer 37: MRS DAYAWATHI JAYASOORIYA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('37', 'MRS DAYAWATHI JAYASOORIYA', '340 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1707, 1707, 0, 'VALID');

    -- Consumer 91: MRS S.A. RANJANI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('91', 'MRS S.A. RANJANI', '338, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2744, 2765, 21, 'VALID');

    -- Consumer 229: MR K M G WIMALASIRI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('229', 'MR K M G WIMALASIRI', '329/5, SURAMYA MATHA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 636, 661, 25, 'VALID');

    -- Consumer 228: MRS A. PRIYADHARSHANI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('228', 'MRS A. PRIYADHARSHANI', '352/1, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1091, 1091, 0, 'VALID');

    -- Consumer 83: MRS R.A NIMALI GUNASEKARA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('83', 'MRS R.A NIMALI GUNASEKARA', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2256, 2277, 21, 'VALID');

    -- Consumer 92: MR R.W. MANOJ KUMARA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('92', 'MR R.W. MANOJ KUMARA', '329/A, MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1550, 1570, 20, 'VALID');

    -- Consumer 115: MR KITHSIRI SAMANTHA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('115', 'MR KITHSIRI SAMANTHA', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3707, 3725, 18, 'VALID');

    -- Consumer 114: MR K.M. NIHAL KARUNARATHNE (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('114', 'MR K.M. NIHAL KARUNARATHNE', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2955, 2972, 17, 'VALID');

    -- Consumer 81: MR SUSIL H. WANAGURU (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('81', 'MR SUSIL H. WANAGURU', '323/4, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2529, 2539, 10, 'VALID');

    -- Consumer 82: MR CHANDRASIRI RUPASINGHE (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('82', 'MR CHANDRASIRI RUPASINGHE', '327/7, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2739, 2756, 17, 'VALID');

    -- Consumer 307: MRS A DAYAWATHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('307', 'MRS A DAYAWATHI', '323/3 SURAMYA MAWATHA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1835, 1839, 4, 'VALID');

    -- Consumer 86: MR JAYANTHA SAMANLAL (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('86', 'MR JAYANTHA SAMANLAL', '323/6, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2112, 2132, 20, 'VALID');

    -- Consumer 193: MR H A SOMALATHA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('193', 'MR H A SOMALATHA', '319/2, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 577, 588, 11, 'VALID');

    -- Consumer 267: MRS H. SAMANTHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('267', 'MRS H. SAMANTHI', '319/1, SUAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1339, 1350, 11, 'VALID');

    -- Consumer 194: MR H. AJITH KEERTHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('194', 'MR H. AJITH KEERTHI', '319/3, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2107, 2117, 10, 'VALID');

    -- Consumer 85: MRS H. PRIYANTHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('85', 'MRS H. PRIYANTHI', '319, SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1511, 1527, 16, 'VALID');

    -- Consumer 145: MR CHAMINDA JAYAKODY (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('145', 'MR CHAMINDA JAYAKODY', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3085, 3104, 19, 'VALID');

    -- Consumer 328: MR M A RANJITH DISSANAYAKE (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('328', 'MR M A RANJITH DISSANAYAKE', 'SUAMYA MAWATHA MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1547, 1578, 31, 'VALID');

    -- Consumer 64: MR K. KULASIRI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('64', 'MR K. KULASIRI', '325/6, SURAMYA MAWATHA MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2606, 2623, 17, 'VALID');

    -- Consumer 369: MRS R A P W RUPASINGHE (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('369', 'MRS R A P W RUPASINGHE', '323/E SURAMYA MAWATHA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 963, 979, 16, 'VALID');

    -- Consumer 373: MRS S A SHIRANTHI MANGALIKA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('373', 'MRS S A SHIRANTHI MANGALIKA', '323/E SURAMYA MAWATHA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 977, 989, 12, 'VALID');

    -- Consumer 375: MRS TECLA PRIYANTHI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('375', 'MRS TECLA PRIYANTHI', '323/E SURAMYA MAWATHA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 737, 745, 8, 'VALID');

    -- Consumer 65: MR UPUL NISHANTHA (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('65', 'MR UPUL NISHANTHA', '325/5 MAGAMMANA HOMAGAMA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1118, 1124, 6, 'VALID');

    -- Consumer 393: MRS N.B.SEPALIKA PRIYADARSHANI (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('393', 'MRS N.B.SEPALIKA PRIYADARSHANI', 'SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 469, 492, 23, 'VALID');

    -- Consumer 11: MRS J. VIOLET WANAGURU (SURAMYA MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('11', 'MRS J. VIOLET WANAGURU', '336/1,SURAMYA MAWATHA, MAGAMMANA (SURAMYA MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1569, 1579, 10, 'VALID');

    -- Consumer 195: MR UPUL NISHANTHA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('195', 'MR UPUL NISHANTHA', '359/1, WEDAGE WATTA. MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 141, 150, 9, 'VALID');

    -- Consumer 77: MR KRISHANTHA KUMARA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('77', 'MR KRISHANTHA KUMARA', '359, WEDAGEWATTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3316, 3343, 27, 'VALID');

    -- Consumer 76: MR JAGATH CHANDRALAL (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('76', 'MR JAGATH CHANDRALAL', 'MAGAMMANA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 149, 176, 27, 'VALID');

    -- Consumer 380: SAR. SHRAMA.SAMITHIYA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('380', 'SAR. SHRAMA.SAMITHIYA', '373/G WEDAGEWATTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 145, 150, 5, 'VALID');

    -- Consumer 80: MRS WIMALAWATHI WETTASINGHE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('80', 'MRS WIMALAWATHI WETTASINGHE', '373/1 , WEDAGEWATTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1024, 1025, 1, 'VALID');

    -- Consumer 294: MR L G L A R DARMAKEERTHI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('294', 'MR L G L A R DARMAKEERTHI', '355/1 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1523, 1532, 9, 'VALID');

    -- Consumer 78: MR D. CHANDIMA PEIRIS (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('78', 'MR D. CHANDIMA PEIRIS', 'MAGAMMANA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1093, 1098, 5, 'VALID');

    -- Consumer 79: MR SOMASIRI JAYAKODY (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('79', 'MR SOMASIRI JAYAKODY', 'MAGAMMANA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1520, 1530, 10, 'VALID');

    -- Consumer 93: MR S. A. M . JAYANTHA KUMARA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('93', 'MR S. A. M . JAYANTHA KUMARA', 'SURAMYA MAWATHA, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2924, 2942, 18, 'VALID');

    -- Consumer 290.1: MR S.A.Y KUMARA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('290.1', 'MR S.A.Y KUMARA', '354 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 222, 247, 25, 'VALID');

    -- Consumer 290.2: MR S.A.Y KUMARA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('290.2', 'MR S.A.Y KUMARA', '354 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2045, 2070, 25, 'VALID');

    -- Consumer 71: MR S.A. NIHAL SARATHCHANDRA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('71', 'MR S.A. NIHAL SARATHCHANDRA', 'MAGAMMANA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2248, 2275, 27, 'VALID');

    -- Consumer 70: MR K.A. GUNANANDA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('70', 'MR K.A. GUNANANDA', 'MAGAMMANA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1566, 1573, 7, 'VALID');

    -- Consumer 61: MR JAYATISSA ATHTHANAYAKE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('61', 'MR JAYATISSA ATHTHANAYAKE', '354/2 WEDAGEWATTHA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1924, 1939, 15, 'VALID');

    -- Consumer 414: MR WISHWA SHAMINDA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('414', 'MR WISHWA SHAMINDA', '33/12A WEDAGEWATHTHA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1250, 1261, 11, 'VALID');

    -- Consumer 309: MR SHANTHA KUMARA PIERIS (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('309', 'MR SHANTHA KUMARA PIERIS', '374/8 WEDAGEWATTA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1131, 1146, 15, 'VALID');

    -- Consumer 288: MR S . A. B. PADMALAL (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('288', 'MR S . A. B. PADMALAL', '374/7 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1499, 1502, 3, 'VALID');

    -- Consumer 42: MR R.D.R. JAYATHILAKE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('42', 'MR R.D.R. JAYATHILAKE', '374/11, WEDAGEWATTA , MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 626, 626, 0, 'VALID');

    -- Consumer 354: MRS W J T C DARSHANI FERNANDO (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('354', 'MRS W J T C DARSHANI FERNANDO', 'WEAGEWATTHA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1976, 1991, 15, 'VALID');

    -- Consumer 338: MRS SISILA T. WIMALASOORIYA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('338', 'MRS SISILA T. WIMALASOORIYA', '374/12 WEAGEWATTHA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1355, 1369, 14, 'VALID');

    -- Consumer 356: MRS D G VIOLET SOMAWATHI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('356', 'MRS D G VIOLET SOMAWATHI', '374/25 WEDAGEWATTA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1427, 1444, 17, 'VALID');

    -- Consumer 335: MISS R B JANANI BUDHDHIKA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('335', 'MISS R B JANANI BUDHDHIKA', '28/10 WEDAGEWATTA MAGAMMANA, (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1541, 1541, 0, 'VALID');

    -- Consumer 428: MISS DUNUHINGE LILAKANTHI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('428', 'MISS DUNUHINGE LILAKANTHI', '374/17 WEDAGEWATTA HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2992, 3009, 17, 'VALID');

    -- Consumer 347: MRS N A R DE SILVA JAYASINGHE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('347', 'MRS N A R DE SILVA JAYASINGHE', '374/3 WEDAGEWATTA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 104, 114, 10, 'VALID');

    -- Consumer 39: MR JAYANTHA GALLAHEWA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('39', 'MR JAYANTHA GALLAHEWA', '374/16 WEDAGE WATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2072, 2072, 0, 'VALID');

    -- Consumer 46: MRS L.A.W. CHANDRIKA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('46', 'MRS L.A.W. CHANDRIKA', '374/10 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1532, 1534, 2, 'VALID');

    -- Consumer 41: MRS B.M. DAMAYANTHI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('41', 'MRS B.M. DAMAYANTHI', '374/13 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1398, 1399, 1, 'VALID');

    -- Consumer 40: MR W.G. ARIYARATHNE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('40', 'MR W.G. ARIYARATHNE', '374/4 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2033, 2033, 0, 'VALID');

    -- Consumer 48: MR W.S. FERNANDO (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('48', 'MR W.S. FERNANDO', '374 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 0, 0, 0, 'VALID');

    -- Consumer 47: MR RANGA N. ATTHANAYAKE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('47', 'MR RANGA N. ATTHANAYAKE', '374/22 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 380, 381, 1, 'VALID');

    -- Consumer 287: MRS H.M. A. KUMARIHAMY (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('287', 'MRS H.M. A. KUMARIHAMY', '374/2 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1199, 1202, 3, 'VALID');

    -- Consumer 173: MR A.A. GUNARATHNE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('173', 'MR A.A. GUNARATHNE', 'WEDAGE WATTA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 783, 804, 21, 'VALID');

    -- Consumer 286: MR W.A.SHANTHA KUMAR (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('286', 'MR W.A.SHANTHA KUMAR', '383/5 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 793, 793, 0, 'VALID');

    -- Consumer 72: MR J.P.C. ABEYSINGHE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('72', 'MR J.P.C. ABEYSINGHE', '384, WEDAGEWTTA, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2755, 2755, 0, 'VALID');

    -- Consumer 68: MRS J.A. SANI JAYAKODI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('68', 'MRS J.A. SANI JAYAKODI', '379/A/2 WEDAGEWATTA MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 5507, 5518, 11, 'VALID');

    -- Consumer 172: MR U.W. GUNARATHNE BANDARA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('172', 'MR U.W. GUNARATHNE BANDARA', '385/2, WEDAGE WATTA ROAD MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1544, 1561, 17, 'VALID');

    -- Consumer 245: MR S.A. NIMALSIRI (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('245', 'MR S.A. NIMALSIRI', '385/1, WEDAGEWATTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1426, 1436, 10, 'VALID');

    -- Consumer 73: MR U.B. WIMAL JAYATHILAKE (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('73', 'MR U.B. WIMAL JAYATHILAKE', '385/1B, WEDAGEWTTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3783, 3806, 23, 'VALID');

    -- Consumer 445: MR S.A.ANURA JAYANTHA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('445', 'MR S.A.ANURA JAYANTHA', '385/1/B ,MAGAMMANA ,HOMAGAMA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 0, 1, 1, 'VALID');

    -- Consumer 378: MR RANAHANSA KREEDA SAMAJAYA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('378', 'MR RANAHANSA KREEDA SAMAJAYA', 'WEDAGEWTTA ROAD, MAGAMMANA (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 50, 51, 1, 'VALID');

    -- Consumer 60: MR W.A.R.S. JAYAWARDHANA (WEDAGEWATHTHA ROAD)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('60', 'MR W.A.R.S. JAYAWARDHANA', '379/2/B, WEDAGEWATTA ROAD (WEDAGEWATHTHA ROAD)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1999, 2018, 19, 'VALID');

    -- Consumer 412: MRS R.A.H.S ALWIS (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('412', 'MRS R.A.H.S ALWIS', '379 WEDAGEWATHTHA ROAD (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1203, 1217, 14, 'VALID');

    -- Consumer 59: MRS S.A. RAMYALATHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('59', 'MRS S.A. RAMYALATHA', '379/15, WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1680, 1687, 7, 'VALID');

    -- Consumer 59.1: MRS S.A. RAMYALATHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('59.1', 'MRS S.A. RAMYALATHA', '379/15, WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 327, 340, 13, 'VALID');

    -- Consumer 74: MR K.P. JAYATISSA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('74', 'MR K.P. JAYATISSA', '379/5A WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1884, 1895, 11, 'VALID');

    -- Consumer 101: MR K.W.D. ATHIK ROHITHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('101', 'MR K.W.D. ATHIK ROHITHA', 'PRAGATHI MAWATHA, 1ST LANE (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2540, 2550, 10, 'VALID');

    -- Consumer 366: MRS D K GANGA JEEWANTHI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('366', 'MRS D K GANGA JEEWANTHI', '379/7/2, WEDAGEWATTA ROAD (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1432, 1437, 5, 'VALID');

    -- Consumer 243: MR DANUKA SHIRANTHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('243', 'MR DANUKA SHIRANTHA', '174/34A WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1277, 1311, 34, 'VALID');

    -- Consumer 244: MR K.W.D. ATHIK ROHITHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('244', 'MR K.W.D. ATHIK ROHITHA', '379/7/1, WEDAGEWATTA ROAD, (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 4137, 4159, 22, 'VALID');

    -- Consumer 376: MR N.L. SIRIPALA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('376', 'MR N.L. SIRIPALA', 'GURUGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 710, 719, 9, 'VALID');

    -- Consumer 407: MR K.G.BANDHUWANSHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('407', 'MR K.G.BANDHUWANSHA', '379/14A WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1706, 1720, 14, 'VALID');

    -- Consumer 106: MR SARATH DHARMASIRI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('106', 'MR SARATH DHARMASIRI', '389/11, WEDAGEWATTA ROAD MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2571, 2589, 18, 'VALID');

    -- Consumer 105: MRS EVA JANET FERNANDO (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('105', 'MRS EVA JANET FERNANDO', '380/4A WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1507, 1507, 0, 'VALID');

    -- Consumer 104: MRS IRESHA FERNANDO (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('104', 'MRS IRESHA FERNANDO', '380/4 WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 624, 626, 2, 'VALID');

    -- Consumer 163: MR ASANKA S. DISSANAYAKE (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('163', 'MR ASANKA S. DISSANAYAKE', 'GURUGE WATTA MAGAMMANA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2761, 2761, 0, 'VALID');

    -- Consumer 100: MR P.G. SAGARA UDAYA KUMARA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('100', 'MR P.G. SAGARA UDAYA KUMARA', '380/3A WEDAGEWATTA ROAD MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 616, 618, 2, 'VALID');

    -- Consumer 103: MR M. SOMASIRI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('103', 'MR M. SOMASIRI', '380/5, WEDAGE WATTA ROAD MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 894, 898, 4, 'VALID');

    -- Consumer 166: MR K.D . AIWAN (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('166', 'MR K.D . AIWAN', 'GURUGE WATTA MAGAMMANA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1308, 1330, 22, 'VALID');

    -- Consumer 155: MR K.P.P. WICKRAMASINGHE (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('155', 'MR K.P.P. WICKRAMASINGHE', 'GURUGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2588, 2588, 0, 'VALID');

    -- Consumer 95: MRS K.M.G. DAMMIKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('95', 'MRS K.M.G. DAMMIKA', 'GURUGE WATTA HOMAGAMA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3221, 3238, 17, 'VALID');

    -- Consumer 443: MR K.PREMARATHNA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('443', 'MR K.PREMARATHNA', 'PRAGATHI MAWATHA, MAGAMMANA', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1, 1, 0, 'VALID');

    -- Consumer 94: MR H.M. HERATH MADAWATTA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('94', 'MR H.M. HERATH MADAWATTA', '398/1/B, WEDAGEWATTA ROAD, (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3178, 3178, 0, 'VALID');

    -- Consumer 234: MRS SULOCHANA ERANDI PERERA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('234', 'MRS SULOCHANA ERANDI PERERA', '398/D, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1172, 1172, 0, 'VALID');

    -- Consumer 377: MR MANOJ H. JAYASOORIYA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('377', 'MR MANOJ H. JAYASOORIYA', '398/2 WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1573, 1595, 22, 'VALID');

    -- Consumer 377.1: MR MANOJ H. JAYASOORIYA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('377.1', 'MR MANOJ H. JAYASOORIYA', '398/2 WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 21, 37, 16, 'VALID');

    -- Consumer 441: MRS D.L.DILSARA SADHARUWANI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('441', 'MRS D.L.DILSARA SADHARUWANI', 'PRAGATHI MAWATHA, MAGAMMANA', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 113, 129, 16, 'VALID');

    -- Consumer 331: MR G W CHAMILA PRIYADHARSHANA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('331', 'MR G W CHAMILA PRIYADHARSHANA', 'GURUGE WATTA WEDAGE WATTA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2855, 2882, 27, 'VALID');

    -- Consumer 227: MR SUSANTHA RAJAPAKSHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('227', 'MR SUSANTHA RAJAPAKSHA', '398/21A,WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1902, 1924, 22, 'VALID');

    -- Consumer 370: MR A R J N WIJAWARDHANA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('370', 'MR A R J N WIJAWARDHANA', '398/19A,WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2492, 2506, 14, 'VALID');

    -- Consumer 141: MRS IROSHA UDAYANGANI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('141', 'MRS IROSHA UDAYANGANI', '398/21 WEDAGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1857, 1865, 8, 'VALID');

    -- Consumer 218: MR R.S. VAAS (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('218', 'MR R.S. VAAS', '398 7/3, PRAGATHI MAWATHA, (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 890, 899, 9, 'VALID');

    -- Consumer 52: MR W.E.C. FERNANDO (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('52', 'MR W.E.C. FERNANDO', '398/6/A, WEDAGEWATTA ROAD, (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3252, 3282, 30, 'VALID');

    -- Consumer 13: MR D. GUNARATHNE (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('13', 'MR D. GUNARATHNE', '398/238, WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 5348, 5368, 20, 'VALID');

    -- Consumer 269: MRS U H PADMARANI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('269', 'MRS U H PADMARANI', '398/23C, PRAGATHI MAWATHA, (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 544, 548, 4, 'VALID');

    -- Consumer 415: MR B.SEETHA PADHMINI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('415', 'MR B.SEETHA PADHMINI', '398/36, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 898, 899, 1, 'VALID');

    -- Consumer 259: MRS M.S. CHANDRIKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('259', 'MRS M.S. CHANDRIKA', '398/34, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1414, 1423, 9, 'VALID');

    -- Consumer 168: MR ANURUDDHA B. WELIVITA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('168', 'MR ANURUDDHA B. WELIVITA', 'GURUGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3065, 3094, 29, 'VALID');

    -- Consumer 14: MR H.M.S. GAMINIWANSA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('14', 'MR H.M.S. GAMINIWANSA', '398/6, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1136, 1145, 9, 'VALID');

    -- Consumer 291: MR W.A.R.S.PERERA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('291', 'MR W.A.R.S.PERERA', '398/39A WEDAGEWATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1131, 1153, 22, 'VALID');

    -- Consumer 268: MRS R.M.S.RENUKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('268', 'MRS R.M.S.RENUKA', '398/17/3, WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 419, 420, 1, 'VALID');

    -- Consumer 116: MR U.G.N. DAMMIKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('116', 'MR U.G.N. DAMMIKA', '397/A/6, WEDAGEWATTA ROAD MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1984, 1991, 7, 'VALID');

    -- Consumer 240: MR JANAKA Y KUMARA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('240', 'MR JANAKA Y KUMARA', '397/4, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1687, 1687, 0, 'VALID');

    -- Consumer 157: MR K.R. GAMINI NANDASIRI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('157', 'MR K.R. GAMINI NANDASIRI', 'GURUGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1438, 1439, 1, 'VALID');

    -- Consumer 171: MR GAMINI WEERASINGHE (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('171', 'MR GAMINI WEERASINGHE', '397/3, WEDAGE WATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1888, 1890, 2, 'VALID');

    -- Consumer 118: MR D.A. ASHOKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('118', 'MR D.A. ASHOKA', '398/17, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 3741, 3771, 30, 'VALID');

    -- Consumer 169: MR D.C.K. KUMARASINGHE (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('169', 'MR D.C.K. KUMARASINGHE', 'GURUGE WATTA MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1686, 1705, 19, 'VALID');

    -- Consumer 386: MR ARUNA SAMANTHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('386', 'MR ARUNA SAMANTHA', 'GURUGE WATTA WEDAGE WATTA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2459, 2494, 35, 'VALID');

    -- Consumer 341: MRS G L CHANDRIKA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('341', 'MRS G L CHANDRIKA', '398/11 WEDAGEWATTA ROAD MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 635, 641, 6, 'VALID');

    -- Consumer 381: MR H W PRABATH NIROSHAN (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('381', 'MR H W PRABATH NIROSHAN', '398/8 WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1484, 1491, 7, 'VALID');

    -- Consumer 381.1: MR H W PRABATH NIROSHAN (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('381.1', 'MR H W PRABATH NIROSHAN', 'PRAGATHI MAWATHA, MAGAMMANA', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 249, 285, 36, 'VALID');

    -- Consumer 379: MR P A CHAMINDA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('379', 'MR P A CHAMINDA', '398/8 B WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1649, 1654, 5, 'VALID');

    -- Consumer 262: MR H.G. NIHAL ANANDA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('262', 'MR H.G. NIHAL ANANDA', '398/8F, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1100, 1121, 21, 'VALID');

    -- Consumer 205: E.P.S. SOCIETY (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('205', 'E.P.S. SOCIETY', '398/8/C, PRAGATHI MAWATHA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 215, 221, 6, 'VALID');

    -- Consumer 263: MRS J.H. ACHINTHA (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('263', 'MRS J.H. ACHINTHA', '398/8E, WEDAGEWATTA ROAD, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 2083, 2102, 19, 'VALID');

    -- Consumer 430: MRS SANDYA INDRANI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('430', 'MRS SANDYA INDRANI', '398/8A, WEDAGEWATTA, MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 1178, 1189, 11, 'VALID');

    -- Consumer 431: MRS E.K RENUKA SHIROMI (PRAGATHI MAWATHA)
    INSERT INTO public.consumers (account_number, account_holder_name, address, status)
    VALUES ('431', 'MRS E.K RENUKA SHIROMI', '398/13WEDAGEWATTA,MAGAMMANA (PRAGATHI MAWATHA)', 'ACTIVE')
    ON CONFLICT (account_number) DO UPDATE SET
        account_holder_name = EXCLUDED.account_holder_name,
        address = EXCLUDED.address,
        status = 'ACTIVE'
    RETURNING id INTO c_id;

    -- Baseline reading
    DELETE FROM public.meter_readings WHERE consumer_id = c_id;
    INSERT INTO public.meter_readings (consumer_id, reader_id, reading_date, previous_reading, current_reading, units_consumed, status)
    VALUES (c_id, r_id, '2026-04-30', 213, 215, 2, 'VALID');

END $$;
