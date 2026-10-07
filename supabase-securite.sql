-- Fap Fap — garde-fou contre les jetons gonflés.
-- Les jetons sont calculés sur le téléphone : un tricheur peut envoyer n'importe quel nombre. Le serveur limite donc
-- ce qu'un compte peut gagner : 200 000 jetons par période de 24 h (la finale du mode histoire tient dedans),
-- 30 000 de réputation par 24 h, et un nouveau compte démarre au maximum à 60 000 jetons.
-- Perdre des jetons n'est jamais limité. Les colonnes gain_* sont tenues par le serveur seul.
alter table public.players add column if not exists gain_t timestamptz not null default now();
alter table public.players add column if not exists gain_n bigint not null default 0;
alter table public.players add column if not exists gain_r integer not null default 0;

create or replace function public.fapfap_guard()
returns trigger language plpgsql set search_path = public
as $$
declare
  cap_chips constant bigint := 200000;
  cap_rep constant integer := 30000;
  room bigint;
begin
  if tg_op = 'INSERT' then
    -- an "upsert" on an existing row is checked by the UPDATE branch, not here
    if exists (select 1 from public.players p where p.id = new.id) then return new; end if;
    new.chips := least(new.chips, 60000);
    new.rep := least(new.rep, 40000);
    new.gain_t := now(); new.gain_n := 0; new.gain_r := 0;
  else
    -- the window of 24 h belongs to the server: whatever the phone sends for it is ignored
    if now() - old.gain_t > interval '24 hours' then
      new.gain_t := now(); new.gain_n := 0; new.gain_r := 0;
    else
      new.gain_t := old.gain_t; new.gain_n := old.gain_n; new.gain_r := old.gain_r;
    end if;
    if new.chips > old.chips then
      room := greatest(0, cap_chips - new.gain_n);
      if new.chips - old.chips > room then new.chips := old.chips + room; end if;
      new.gain_n := new.gain_n + (new.chips - old.chips);
    end if;
    if new.rep > old.rep then
      if new.rep - old.rep > greatest(0, cap_rep - new.gain_r) then new.rep := old.rep + greatest(0, cap_rep - new.gain_r); end if;
      new.gain_r := new.gain_r + (new.rep - old.rep);
    end if;
  end if;
  -- the cloud save tells the same story as the leaderboard
  if jsonb_typeof(new.data->'profile') = 'object' and (new.data->'profile') ? 'chips' then
    new.data := jsonb_set(new.data, '{profile,chips}', to_jsonb(new.chips));
  end if;
  return new;
end
$$;
revoke all on function public.fapfap_guard() from public;

drop trigger if exists fapfap_guard on public.players;
create trigger fapfap_guard before insert or update on public.players
for each row execute function public.fapfap_guard();
