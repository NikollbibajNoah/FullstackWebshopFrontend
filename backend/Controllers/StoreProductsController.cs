using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StoreProductsController(DBStoreContext db) : ControllerBase
    {
  
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductData>>> Get()
        {
            return Ok(await db.Products.ToListAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductData>> GetProductById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var product = await db.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductData>> CreateProduct([FromBody] ProductData product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            db.Products.Add(product);
            await db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<ProductData>> UpdateProduct(int id, [FromBody] ProductData product)
        {
            if (id <= 0 || product == null)
            {
                return BadRequest();
            }

            var existingProduct = await db.Products.FindAsync(id);

            if (existingProduct == null)
            {
                return NotFound();
            }

            existingProduct.Name = product.Name;
            existingProduct.Category = product.Category;
            existingProduct.Description = product.Description;
            existingProduct.Price = product.Price;

            await db.SaveChangesAsync();

            return Ok(existingProduct);
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ProductData>> DeleteProduct(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var product = await db.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            await db.SaveChangesAsync();

            return Ok(product);
        }
    }
}
