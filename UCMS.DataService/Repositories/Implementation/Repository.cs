﻿using Microsoft.EntityFrameworkCore;
using UCMS.DataService.Data;
using UCMS.DataService.Repositories.Interface;
using UCMS.Models.DbModels;

namespace UCMS.DataService.Repositories.Implementation
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly UCMSDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(UCMSDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public async Task<T> AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
