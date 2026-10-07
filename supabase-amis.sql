-- Fap Fap — amis : le classement renvoie aussi l'identifiant du joueur (pour l'ajouter en ami ou le défier),
-- et une fonction donne le pseudo, les jetons et la réputation d'une liste d'amis. Jamais l'e-mail ni le profil.
drop function if exists public.fapfap_top(integer);
create function public.fapfap_top(lim integer default 50)
returns table(pos bigint, pid uuid, name text, chips bigint, rep integer, me boolean, saved boolean)
language sql stable security definer set search_path = public
as $$
  with r as (
    select p.id, p.name, p.chips, p.rep,
           row_number() over (order by p.chips desc, p.updated_at asc) as pos,
           coalesce(u.is_anonymous, true) = false as saved
    from public.players p
    left join auth.users u on u.id = p.id
    where coalesce(trim(p.name), '') <> ''
  )
  select r.pos, r.id, r.name, r.chips, r.rep, r.id = auth.uid(), r.saved
  from r
  where r.pos <= least(greatest(lim, 1), 100) or r.id = auth.uid()
  order by r.pos;
$$;
revoke all on function public.fapfap_top(integer) from public;
grant execute on function public.fapfap_top(integer) to anon, authenticated;

create or replace function public.fapfap_players(ids uuid[])
returns table(pid uuid, name text, chips bigint, rep integer)
language sql stable security definer set search_path = public
as $$
  select p.id, p.name, p.chips, p.rep
  from public.players p
  where p.id = any(ids[1:100]);
$$;
revoke all on function public.fapfap_players(uuid[]) from public;
grant execute on function public.fapfap_players(uuid[]) to authenticated;
